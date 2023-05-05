import {
  ChangeEvent,
  Dispatch,
  LegacyRef,
  SetStateAction,
  MouseEvent,
} from "react";

export interface IUploadProps {
  uploadRef: LegacyRef<HTMLInputElement> | undefined;
  onClickImageUpload: (event: any) => void;
  onChangeImageFile: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickUploadImgCancel: (event: MouseEvent<HTMLImageElement>) => void;
  imageUrl: string;
  isProduct?: boolean;
}

export interface IBoardWriteProps {
  setFileUrls: Dispatch<SetStateAction<string[]>>;
  fileUrls: string[];
  index: number;
  isProduct?: boolean;
}

export interface ICssprops {
  isProduct?: boolean;
}
