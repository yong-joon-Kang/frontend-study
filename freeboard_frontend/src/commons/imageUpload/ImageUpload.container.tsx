import { ChangeEvent, useRef } from "react";
import ImageUploadPresenterPage from "./ImageUpload.presenter";
import { UPLOAD_FILE } from "./ImageUpload.queries";
import { useMutation } from "@apollo/client";
import { IBoardWriteProps } from "./ImageUpload.types";
import checkValidationImage from "./ImageUpload.validations";

function ImageUpload(props: IBoardWriteProps) {
  const uploadRef = useRef<HTMLInputElement>(null);

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickImageUpload = () => {
    uploadRef?.current?.click();
  };

  const onChangeImageFile = async (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files?.[0]);
    if (event.target.files?.[0]) {
      const file = checkValidationImage(event.target.files?.[0]);
      if (!file) return;
    }
    console.log("???");
    // console.log(event.target.files?.[0]);
    const result = await uploadFile({
      variables: {
        file: event.target.files?.[0],
      },
    });
    const fileUrls = [...props.fileUrls];
    fileUrls[props.index] = result.data.uploadFile.url;
    props.setFileUrls(fileUrls);
  };
  return (
    <ImageUploadPresenterPage
      onClickImageUpload={onClickImageUpload}
      onChangeImageFile={onChangeImageFile}
      uploadRef={uploadRef}
      imageUrl={props.fileUrls[props.index]}
    />
  );
}

export default ImageUpload;
