import React from "react";
import * as S from "./ImageUpload.styles";
import { IUploadProps } from "./ImageUpload.types";

function ImageUploadPresenterPage(props: IUploadProps) {
  return (
    <>
      <S.UploadBtn
        onClick={props.onClickImageUpload}
        isProduct={props.isProduct}
      >
        {props.imageUrl ? (
          <>
            <S.Cancel
              onClick={props.onClickUploadImgCancel}
              src="/cancel.png"
            ></S.Cancel>
            <S.Img src={`https://storage.googleapis.com/${props.imageUrl}`} />
          </>
        ) : (
          <>
            <S.Plus>+</S.Plus>
            <S.UploadText>Upload</S.UploadText>
          </>
        )}
      </S.UploadBtn>
      <input
        type="file"
        ref={props.uploadRef}
        onChange={props.onChangeImageFile}
        style={{ display: "none" }}
      />
    </>
  );
}

export default ImageUploadPresenterPage;
