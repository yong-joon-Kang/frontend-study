/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import UsedItemsPresenterPage from "./UsedItemsWrite.presenter";
import {
  CREATE_BOARD,
  CREATE_USED_ITEM,
  EDIT_BOARD,
} from "./UsedItemsWrite.queries";

import { message } from "antd";
import { WithAuth } from "../../commons/withAuth/WithAuth";
import { indexPageProps } from "./UsedItemsWrite.types";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function UsedItemsWriteContainerPage(props: indexPageProps) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});

  const router = useRouter();
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  const [createUsedItems] = useMutation(CREATE_USED_ITEM);

  const onSubmit = async (data: any) => {
    console.log("onSubmit 실행");
    if (Object.keys(errors).length > 0) return false;

    console.log(data);
    if (!data.price) return false;

    // 태그 공백 없애고 #으로 split
    const resultTags = data.tags?.replaceAll(" ", "").split("#");
    const tags = resultTags?.filter((el: string) => el);

    // 상품가격 숫자로 변경
    const price = data.price?.replaceAll(",", "");
    try {
      const result = await createUsedItems({
        variables: {
          createUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: Number(price),
            tags,
            images: fileUrls,
          },
        },
      });

      console.log(result.data);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const onClickUsedItemsList = () => {
    router.push("/usedItems/list");
  };

  return (
    <>
      {/* {contextHolder} */}
      <UsedItemsPresenterPage
        // register={register}
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
