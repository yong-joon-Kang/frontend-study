import { ChangeEvent } from "react";

export interface IBoardWriteContainerPageProps {
  isEdit: boolean;
  fetchBoardDataList: any;
}

export interface IUpdateVariables {
  boardId: string | undefined | string[];
  password: string;
  updateBoardInput: {
    title?: string;
    contents?: string;
  };
}

export interface IBoardWritePresenterPageProps {
  writerErr: string;
  passwordErr: string;
  titleErr: string;
  contentsErr: string;
  isActive: boolean;
  isEdit: boolean;
  fetchBoardDataList: any;
  onWriterChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onTitleChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onContentsChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onSubmitUpdate: () => void;
}

export interface ISubmitBtnProps {
  isActive: boolean;
}
