import {
  ChangeEvent,
  Dispatch,
  LegacyRef,
  SetStateAction,
  MouseEvent,
} from "react";

export interface IUploadProps {
  fileUrl: string;
  uploadRef: LegacyRef<HTMLInputElement> | undefined;
  onClickImageUpload: (event: any) => void;
  onChangeImageFile: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickUploadImgCancel: (event: MouseEvent<HTMLImageElement>) => void;
  imageUrl: string;
  isProduct?: boolean;
  isProfile?: boolean;
}

export interface IBoardWriteProps {
  imageUrl: any;
  imageUrls: any;
  setFile: any;
  file: any;
  setFileUrls: Dispatch<SetStateAction<string[]>>;
  fileUrls: string[];
  index: number;
  isProduct?: boolean;
  isProfile?: boolean;
}

export interface ICssprops {
  isProduct?: boolean;
  isProfile?: boolean;
}
