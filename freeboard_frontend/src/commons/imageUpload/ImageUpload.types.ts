import { ChangeEvent, Dispatch, LegacyRef, SetStateAction } from "react";

export interface IUploadProps {
  uploadRef: LegacyRef<HTMLInputElement> | undefined;
  onClickImageUpload: () => void;
  onChangeImageFile: (event: ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
}

export interface IBoardWriteProps {
  setFileUrls: Dispatch<SetStateAction<string[]>>;
  fileUrls: string[];
  index: number;
}
