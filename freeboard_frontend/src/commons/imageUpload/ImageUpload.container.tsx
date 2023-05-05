import { ChangeEvent, MouseEvent, useRef } from "react";
import ImageUploadPresenterPage from "./ImageUpload.presenter";
import { UPLOAD_FILE } from "./ImageUpload.queries";
import { useMutation } from "@apollo/client";
import { IBoardWriteProps } from "./ImageUpload.types";
import checkValidationImage from "./ImageUpload.validations";

function ImageUpload(props: IBoardWriteProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const fileUrls = [...props.fileUrls];

  const onClickImageUpload = (event: any) => {
    event.preventDefault(); // 폼 제출 막기
    uploadRef?.current?.click();
  };

  const onChangeImageFile = async (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files?.[0]);
    if (event.target.files?.[0]) {
      const file = checkValidationImage(event.target.files?.[0]);
      if (!file) return;
    }
    // console.log(event.target.files?.[0]);
    const result = await uploadFile({
      variables: {
        file: event.target.files?.[0],
      },
    });

    fileUrls[props.index] = result.data.uploadFile.url;
    props.setFileUrls(fileUrls);
  };

  const onClickUploadImgCancel = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault(); // 폼 제출 막기
    event.stopPropagation(); // 이벤트 버블링 막기

    fileUrls[props.index] = "";
    props.setFileUrls(fileUrls);
  };

  return (
    <ImageUploadPresenterPage
      onClickImageUpload={onClickImageUpload}
      onChangeImageFile={onChangeImageFile}
      onClickUploadImgCancel={onClickUploadImgCancel}
      uploadRef={uploadRef}
      imageUrl={props.fileUrls[props.index]}
      isProduct={props.isProduct}
    />
  );
}

export default ImageUpload;
