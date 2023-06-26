import { IQuery } from "./../../../commons/types/generated/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IBoardWriteContainerPageProps {
  isEdit: boolean;
  fetchBoardDataList?: Pick<IQuery, "fetchBoard">;
}

export interface IUpdateBoardInput {
  youtubeUrl?: string;
  title?: string;
  contents?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
  images?: string[];
}

export interface IBoardWritePresenterPageProps {
  setFileUrls: Dispatch<SetStateAction<string[]>>;
  fileUrls: string[];
  writerErr: string;
  passwordErr: string;
  titleErr: string;
  contentsErr: string;
  isActive: boolean;
  isEdit: boolean;
  address: string;
  zipcode: string;
  isSubmitting: boolean;
  fetchBoardDataList?: Pick<IQuery, "fetchBoard">;
  file: string[];
  setFile: any;
  onWriterChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onTitleChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onContentsChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeDetailAddress: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onSubmitUpdate: () => void;
  onClickPostCode: () => void;
}

export interface ISubmitBtnProps {
  isActive: boolean;
}
