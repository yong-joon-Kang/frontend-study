import {
  ChangeEvent,
  Dispatch,
  LegacyRef,
  SetStateAction,
  MouseEvent,
} from "react";

export interface IUploadProps {
  file: any;
  fileUrl: string;
  uploadRef: LegacyRef<HTMLInputElement> | undefined;
  onClickImageUpload: (event: any) => void;
  onChangeImageFile: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickUploadImgCancel: (event: MouseEvent<HTMLImageElement>) => void;
  isProduct?: boolean;
  isProfile?: boolean;
}

export interface IBoardWriteProps {
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
