/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import UsedItemsPresenterPage from "./UsedItemsWrite.presenter";
import {
  CREATE_BOARD,
  CREATE_USED_ITEM,
  EDIT_BOARD,
} from "./UsedItemsWrite.queries";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { WithAuth } from "../../commons/withAuth/WithAuth";
import { indexPageProps } from "./UsedItemsWrite.types";
import { useMutation } from "@apollo/client";
import { useState } from "react";

function UsedItemsWriteContainerPage(props: indexPageProps) {
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const { register, handleSubmit } = useForm();
  const [createUsedItems] = useMutation(CREATE_USED_ITEM);

  const onClickSubmit = async (data: any) => {
    // console.log(data);

    // 태그 공백 없애고 #으로 split
    const resultTags = data.tags.replaceAll(" ", "").split("#");
    const tags = resultTags.filter((el: string) => el);

    try {
      const result = await createUsedItems({
        variables: {
          createUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: Number(data.price),
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
  return (
    <>
      {/* {contextHolder} */}
      <UsedItemsPresenterPage
        register={register}
        handleSubmit={handleSubmit}
        onClickSubmit={onClickSubmit}
        fileUrls={fileUrls}
        setFileUrls={setFileUrls}
        // writerErr={writerErr}
        // passwordErr={passwordErr}
        // titleErr={titleErr}
        // contentsErr={contentsErr}
        // isActive={isActive}
        // isEdit={props.isEdit}
        // fetchBoardDataList={props.fetchBoardDataList}
        // onWriterChanged={onWriterChanged}
        // onPasswordChanged={onPasswordChanged}
        // onTitleChanged={onTitleChanged}
        // onContentsChanged={onContentsChanged}
        // onSubmit={onSubmit}
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
