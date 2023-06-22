/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import UsedItemsPresenterPage from "./UsedItemsWrite.presenter";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from "./UsedItemsWrite.queries";

import { message } from "antd";
import { WithAuth } from "../../commons/withAuth/WithAuth";
import { indexPageProps } from "./UsedItemsWrite.types";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FETCH_USED_ITEM } from "../detail/UsedItemsDetail.queries";
import {
  IQuery,
  IQueryFetchUseditemArgs,
  IUpdateUseditemInput,
} from "../../../commons/types/generated/types";
import { UPLOAD_FILE } from "../../../commons/imageUpload/ImageUpload.queries";

function UsedItemsWriteContainerPage(props: indexPageProps) {
  const [messageApi, contextHolder] = message.useMessage(); // 비밀번호 에러 alert
  const router = useRouter();
  const [createUsedItems] = useMutation(CREATE_USED_ITEM);
  const [updateUsedItems] = useMutation(UPDATE_USED_ITEM);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const { data: fetchUsedItemData } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: {
      useditemId: String(router.query.id),
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    control,
    setValue,
    watch,
  } = useForm({ defaultValues: fetchUsedItemData?.fetchUseditem });

  // 이미지 바뀌는 state
  const [fileUrls, setFileUrls] = useState(
    fetchUsedItemData?.fetchUseditem?.images ?? ["", "", ""]
  );

  // 기존 imageUrl
  const [registedFileUrls, setRegistedFileUrls] = useState(["", "", ""]);

  useEffect(() => {
    setRegistedFileUrls(
      fetchUsedItemData?.fetchUseditem?.images ?? ["", "", ""]
    );
  }, []);

  const [file, setFile] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data: any) => {
    console.log(data);
    if (Object.keys(errors).length > 0) return false;
    else setIsSubmitting(true);
    if (!data.price) return false;
    if (data.contents === "<p><br></p>") return false;

    // tags 가공
    let tags = [];
    if (data.tags.length > 0 && data.tags[0]) {
      if (data.tags.includes(" ")) {
        const resultTags = data.tags?.replaceAll(" ", "").split("#");
        tags = resultTags?.filter((el: string) => el); // 공백인 태그는 제거
      } else {
        tags = data.tags;
      }
    }

    // 상품가격 string -> number type 변경
    let price;
    if (JSON.stringify(data.price)?.includes(",")) {
      price = Number(data.price?.replaceAll(",", ""));
    } else price = Number(data.price);

    if (props.isEdit) {
      // 수정 시
      try {
        let images: string[] = [];

        // file 업로드 할게 없으면
        if (file.length === 0) {
          // 이미지 변경사항이 있다면 fileUrls의 결과를 images에 넣어준다!(googleapis는 제거!)
          images = fileUrls.map((el) =>
            el.includes("https://storage.googleapis.com/")
              ? el.split("https://storage.googleapis.com/")[1]
              : el
          );
        } else {
          // file 업로드 할게 있다면!
          // file을 업로드 후 나온 순수url을 registed에 넣는다! 그리고 images에 넣어준다!
          const resultFile = file.map(
            async (el, index) =>
              // file태그가 존재하고 fileUrls가 존재할 때
              el &&
              fileUrls[index] &&
              (await uploadFile({
                variables: {
                  file: el,
                },
              }))
          );
          // console.log("resultFileresultFileresultFileresultFileresultFile");
          // console.log(resultFile);

          // 업로드 후 return된 순수urls
          const cloudResultUrls = await Promise.all(resultFile);

          console.log(
            "cloudResultUrlscloudResultUrlscloudResultUrlscloudResultUrls"
          );
          console.log(cloudResultUrls);

          // registed와 합치기
          const registedUrls = [...registedFileUrls];
          new Array(3).fill("").map(
            (_el, index) =>
              cloudResultUrls[index] // 신규 이미지 있으면 신규이미지 넣어줌
                ? (registedUrls[index] =
                    cloudResultUrls[index]?.data.uploadFile.url)
                : !fileUrls[index] && (registedUrls[index] = "") // 신규 이미지 없고 fileUrls 없을 때 공백 넣어줌
          );

          console.log(
            "registedUrlsregistedUrlsregistedUrlsregistedUrlsregistedUrls"
          );
          console.log(registedUrls);

          images = registedUrls;
        }

        console.log("imagesimagesimagesimagesimagesimagesimagesimagesimages");
        console.log(images);

        // updateUseditemInput
        const updateUseditemInput: IUpdateUseditemInput = {
          useditemAddress: {},
        };
        const isChangedName =
          fetchUsedItemData?.fetchUseditem.name !== data.name;
        const isChangedRemarks =
          fetchUsedItemData?.fetchUseditem.remarks !== data.remarks;
        const isChangedContents =
          fetchUsedItemData?.fetchUseditem.contents !== data.contents;
        const isChangedPrice =
          fetchUsedItemData?.fetchUseditem.price !== data.price;
        const isChangedTags =
          JSON.stringify(fetchUsedItemData?.fetchUseditem.tags) !==
          JSON.stringify(data.tags);
        const isChangedAddress =
          fetchUsedItemData?.fetchUseditem.useditemAddress?.address !==
          data.address;
        const isChangedImages =
          JSON.stringify(registedFileUrls) !== JSON.stringify(images);
        if (isChangedName) updateUseditemInput.name = data.name;
        if (isChangedRemarks) updateUseditemInput.remarks = data.remarks;
        if (isChangedContents) updateUseditemInput.contents = data.contents;
        if (isChangedPrice) updateUseditemInput.price = price;
        if (isChangedAddress && updateUseditemInput.useditemAddress) {
          updateUseditemInput.useditemAddress.address = data.address;
        }
        if (updateUseditemInput.useditemAddress)
          updateUseditemInput.useditemAddress.addressDetail =
            data.addressDetail;
        if (isChangedTags) updateUseditemInput.tags = tags;
        if (isChangedImages) updateUseditemInput.images = images;

        // console.log(Object.values(updateUseditemInput)[0]);

        // 주소 수정된 것이 없으면 useditemAddress key 삭제
        let resultUpdateInput = updateUseditemInput;
        if (!Object.values(updateUseditemInput)[0]?.address) {
          const { useditemAddress, ...rest } = updateUseditemInput;
          resultUpdateInput = rest;
        }

        console.log("resultUpdateInput===========");
        console.log(Object.keys(resultUpdateInput));

        if (
          // Object.keys(updateUseditemInput).every(
          //   (el) => el === "useditemAddress"
          // ) &&
          // !Object.values(updateUseditemInput)[0]?.address &&
          // !Object.values(updateUseditemInput)[0]?.addressDetail &&
          Object.keys(resultUpdateInput).length === 0
        ) {
          messageApi.open({
            type: "warning",
            content: "수정한 것이 없습니다.",
          });

          return false;
        }

        const result = await updateUsedItems({
          variables: {
            useditemId: router.query.id,
            updateUseditemInput: resultUpdateInput,
          },
        });

        // console.log(result.data);
        router.push(`/usedItems/detail/${router.query.id}`);
      } catch (error) {
        if (error instanceof Error) {
          // if (Object.keys(updateUseditemInput).length < 1) {
          messageApi.open({
            type: "error",
            content: (
              <>
                상품 수정을 실패하였습니다. <br /> 잠시후 다시 시도해주세요.
              </>
            ),
          });
          // }
        }
      }
    } else {
      // 등록 시
      try {
        const resultFile = file.map(
          async (el, index) =>
            // file태그가 존재하고 fileUrls가 존재할 때
            el &&
            fileUrls[index] &&
            (await uploadFile({
              variables: {
                file: el,
              },
            }))
        );

        // undefined를 공백으로 치환
        const cloudResultUrls = await Promise.all(resultFile);
        console.log("cloudResultUrls==========================");
        console.log(cloudResultUrls);
        const images: any[] | null | undefined = [];
        new Array(3)
          .fill("")
          .map((_el, index) =>
            cloudResultUrls[index]
              ? images.push(cloudResultUrls[index]?.data.uploadFile.url)
              : images.push("")
          );

        const result = await createUsedItems({
          variables: {
            createUseditemInput: {
              name: data.name,
              remarks: data.remarks,
              contents: data.contents,
              price,
              tags,
              images,
              useditemAddress: {
                address: "",
              },
            },
          },
        });
        // console.log(result.data);
        router.push(`/usedItems/detail/${result.data.createUseditem._id}`);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }
  };

  const onClickUsedItemsList = () => {
    router.push("/usedItems/list");
  };

  // const onChangeReactQuill = (value: string) => {
  //   console.log(value);
  //   if (value !== "<p><br></p>") setValue("contents", value);
  // };

  return (
    <>
      {contextHolder}
      <UsedItemsPresenterPage
        register={register}
        handleSubmit={handleSubmit}
        fileUrls={fileUrls}
        setFileUrls={setFileUrls}
        file={file}
        setFile={setFile}
        onClickUsedItemsList={onClickUsedItemsList}
        control={control}
        errors={errors}
        isEdit={props.isEdit}
        onSubmit={onSubmit}
        data={fetchUsedItemData}
        setValue={setValue}
        // onChangeReactQuill={onChangeReactQuill}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        watch={watch}
      />
    </>
  );
}

export default WithAuth(UsedItemsWriteContainerPage);
