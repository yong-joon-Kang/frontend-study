import { ChangeEvent, MouseEvent, useRef } from "react";
import ImageUploadPresenterPage from "./ImageUpload.presenter";
import { IBoardWriteProps } from "./ImageUpload.types";
import checkValidationImage from "./ImageUpload.validations";

function ImageUpload(props: IBoardWriteProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const fileArr = [...props.file];
  const fileUrls = [...props.fileUrls];

  const onClickImageUpload = (event: any) => {
    event.preventDefault(); // 폼 제출 막기
    uploadRef?.current?.click();
  };

  const onChangeImageFile = async (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files?.[0]);
    const file = event.target.files?.[0];
    if (typeof file === "undefined") return;
    if (event.target.files?.[0]) {
      const result = checkValidationImage(file);
      if (!result) return;
    }

    // 스토리지에 저장할 실제파일
    fileArr[props.index] = file;
    props.setFile(fileArr);

    // 미리보기 보여만 준다 ->
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log(event.target?.result);
      if (typeof event.target?.result === "string") {
        fileUrls[props.index] = event.target?.result;
        props.setFileUrls(fileUrls);
      }
    };
  };

  const onClickUploadImgCancel = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault(); // 폼 제출 막기
    event.stopPropagation(); // 이벤트 버블링 막기

    fileUrls[props.index] = "";
    props.setFileUrls(fileUrls);
    fileArr[props.index] = "";
    props.setFile(fileArr);
  };

  return (
    <ImageUploadPresenterPage
      onClickImageUpload={onClickImageUpload}
      onChangeImageFile={onChangeImageFile}
      onClickUploadImgCancel={onClickUploadImgCancel}
      uploadRef={uploadRef}
      fileUrl={props.fileUrls[props.index]}
      file={props.file[props.index]}
      isProduct={props.isProduct}
      isProfile={props.isProfile}
    />
  );
}

export default ImageUpload;
