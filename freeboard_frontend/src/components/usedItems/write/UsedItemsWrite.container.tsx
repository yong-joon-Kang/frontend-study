/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import UsedItemsPresenterPage from "./UsedItemsWrite.presenter";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from "./UsedItemsWrite.queries";

import { message } from "antd";
import { WithAuth } from "../../commons/withAuth/WithAuth";
import { indexPageProps } from "./UsedItemsWrite.types";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FETCH_USED_ITEM } from "../detail/UsedItemsDetail.queries";
import {
  IQuery,
  IQueryFetchUseditemArgs,
  IUpdateUseditemInput,
} from "../../../commons/types/generated/types";

function UsedItemsWriteContainerPage(props: indexPageProps) {
  const [messageApi, contextHolder] = message.useMessage(); // 비밀번호 에러 alert
  const router = useRouter();
  const [createUsedItems] = useMutation(CREATE_USED_ITEM);
  const [updateUsedItems] = useMutation(UPDATE_USED_ITEM);

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
    formState: { errors, isSubmitted, isSubmitting },
    control,
    // setValue,
    watch,
  } = useForm({ defaultValues: fetchUsedItemData?.fetchUseditem });

  const [fileUrls, setFileUrls] = useState(
    fetchUsedItemData?.fetchUseditem?.images ?? ["", "", ""]
  );

  const onSubmit = async (data: any) => {
    // console.log(data);
    if (Object.keys(errors).length > 0) return false;
    if (!data.price) return false;
    if (data.contents === "<p><br></p>") return false;

    // tags 가공
    let tags = [];
    if (data.tags.length > 0 && data.tags[0]) {
      if (data.tags.includes(" ")) {
        const resultTags = data.tags?.replaceAll(" ", "").split("#");
        tags = resultTags?.filter((el: string) => el); // 공백인 태그는 제거
      } else {
        tags = data.tags?.split("#");
        tags = tags?.filter((el: string) => el); // 공백인 태그는 제거
      }
    }

    // 상품가격 string -> number type 변경
    let price;
    if (JSON.stringify(data.price)?.includes(",")) {
      price = Number(data.price?.replaceAll(",", ""));
    }

    if (props.isEdit) {
      // 수정 시
      try {
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
        const isChangedAddressDetail =
          fetchUsedItemData?.fetchUseditem.useditemAddress?.addressDetail !==
          data.addressDetail;
        const isChangedImages =
          JSON.stringify(fetchUsedItemData?.fetchUseditem.images) !==
          JSON.stringify(fileUrls);
        if (isChangedName) updateUseditemInput.name = data.name;
        if (isChangedRemarks) updateUseditemInput.remarks = data.remarks;
        if (isChangedContents) updateUseditemInput.contents = data.contents;
        if (isChangedPrice) updateUseditemInput.price = price;
        if (isChangedAddress && updateUseditemInput.useditemAddress) {
          updateUseditemInput.useditemAddress.address = data.address;
        }
        if (isChangedAddressDetail && updateUseditemInput.useditemAddress)
          updateUseditemInput.useditemAddress.addressDetail =
            data.addressDetail;
        if (isChangedTags) updateUseditemInput.tags = tags;
        if (isChangedImages) updateUseditemInput.images = fileUrls;

        // console.log(Object.values(updateUseditemInput)[0]);

        // 주소 수정된 것이 없으면 key 삭제
        let resultUpdateInput = updateUseditemInput;
        if (
          !Object.values(updateUseditemInput)[0]?.address &&
          !Object.values(updateUseditemInput)[0]?.addressDetail
        ) {
          const { useditemAddress, ...rest } = updateUseditemInput;
          resultUpdateInput = rest;
        }

        if (
          Object.keys(updateUseditemInput).every(
            (el) => el === "useditemAddress"
          ) &&
          !Object.values(updateUseditemInput)[0]?.address &&
          !Object.values(updateUseditemInput)[0]?.addressDetail
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

        console.log(result.data);
        router.push(`/usedItems/detail/${router.query.id}`);
      } catch (error) {
        if (error instanceof Error) {
          if (Object.keys(updateUseditemInput).length < 1) {
            messageApi.open({
              type: "error",
              content: (
                <>
                  상품 수정을 실패하였습니다. <br /> 잠시후 다시 시도해주세요.
                </>
              ),
            });
          }
        }
      }
    } else {
      // 등록 시
      try {
        const result = await createUsedItems({
          variables: {
            createUseditemInput: {
              name: data.name,
              remarks: data.remarks,
              contents: data.contents,
              price,
              tags,
              images: fileUrls,
              useditemAddress: {
                address: "",
                addressDetail: "",
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
        onClickUsedItemsList={onClickUsedItemsList}
        control={control}
        errors={errors}
        isEdit={props.isEdit}
        onSubmit={onSubmit}
        data={fetchUsedItemData}
        // setValue={setValue}
        // onChangeReactQuill={onChangeReactQuill}
        isSubmitted={isSubmitted}
        isSubmitting={isSubmitting}
        watch={watch}
      />
    </>
  );
}

export default WithAuth(UsedItemsWriteContainerPage);
