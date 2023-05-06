/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import UsedItemsPresenterPage from "./UsedItemsWrite.presenter";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from "./UsedItemsWrite.queries";

import { Modal, message } from "antd";
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

  // console.log(data?.fetchUseditem);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues: fetchUsedItemData?.fetchUseditem });

  const [fileUrls, setFileUrls] = useState(
    fetchUsedItemData?.fetchUseditem?.images ?? ["", "", ""]
  );

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length > 0) return false;
    if (!data.price) return false;

    let tags = [];
    if (data.tags.length > 0 && data.tags[0]) {
      const resultTags = data.tags?.replaceAll(" ", "").split("#");
      tags = resultTags?.filter((el: string) => el); // 공백인 태그는 제거
    }

    // 상품가격 숫자로 변경
    let price;
    if (JSON.stringify(data.price)?.includes(",")) {
      price = Number(data.price?.replaceAll(",", ""));
    }

    const updateUseditemInput: IUpdateUseditemInput = {};
    const isChangedName = fetchUsedItemData?.fetchUseditem.name !== data.name;
    const isChangedRemarks =
      fetchUsedItemData?.fetchUseditem.remarks !== data.remarks;
    const isChangedContents =
      fetchUsedItemData?.fetchUseditem.contents !== data.contents;
    const isChangedPrice =
      fetchUsedItemData?.fetchUseditem.price !== data.price;
    const isChangedTags =
      JSON.stringify(fetchUsedItemData?.fetchUseditem.tags) !==
      JSON.stringify(data.tags);
    const isChangedImages =
      JSON.stringify(fetchUsedItemData?.fetchUseditem.images) !==
      JSON.stringify(fileUrls);
    if (isChangedName) updateUseditemInput.name = data.name;
    if (isChangedRemarks) updateUseditemInput.remarks = data.remarks;
    if (isChangedContents) updateUseditemInput.contents = data.contents;
    if (isChangedPrice) updateUseditemInput.price = price;
    if (isChangedTags) updateUseditemInput.tags = data.tags;
    if (isChangedImages) updateUseditemInput.images = fileUrls;

    console.log(updateUseditemInput);

    if (Object.keys(updateUseditemInput).length < 1) {
      messageApi.open({
        type: "warning",
        content: "수정한 것이 없습니다.",
      });

      return false;
    }

    if (props.isEdit) {
      try {
        const result = await updateUsedItems({
          variables: {
            useditemId: router.query.id,
            updateUseditemInput: updateUseditemInput,
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
            },
          },
        });

        console.log(result.data);
        router.push(`/usedItems/detail/${result.data.createUseditem._id}`);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }
  };

  const onClickUsedItemsList = () => {
    router.push("/usedItems/list");
  };

  return (
    <>
      {contextHolder}
      <UsedItemsPresenterPage
        register={register}
        handleSubmit={handleSubmit}
        fileUrls={fileUrls}
        setFileUrls={setFileUrls}
        onClickUsedItemsList={onClickUsedItemsList}
        // formState={formState}
        control={control}
        errors={errors}
        // writerErr={writerErr}
        // passwordErr={passwordErr}
        // titleErr={titleErr}
        // contentsErr={contentsErr}
        isEdit={props.isEdit}
        // fetchBoardDataList={props.fetchBoardDataList}
        // onWriterChanged={onWriterChanged}
        // onPasswordChanged={onPasswordChanged}
        // onTitleChanged={onTitleChanged}
        // onContentsChanged={onContentsChanged}
        onSubmit={onSubmit}
        // onSubmitUpdate={onSubmitUpdate}
        data={fetchUsedItemData}

        // onClickPostCode={onClickPostCode}
        // zipcode={zipcode}
        // address={address}
        // onChangeDetailAddress={onChangeDetailAddress}
        // setFileUrls={setFileUrls}
        // fileUrls={fileUrls}
        // onChangeYoutubeUrl={onChangeYoutubeUrl}
      />
    </>
  );
}

export default WithAuth(UsedItemsWriteContainerPage);
