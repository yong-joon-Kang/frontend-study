import { IQuery } from "./../../../commons/types/generated/types";
import { ChangeEvent } from "react";

export interface IBoardWriteContainerPageProps {
  isEdit: boolean;
  fetchBoardDataList?: Pick<IQuery, "fetchBoard">;
}

export interface IUpdateVariables {
  boardId: string;
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
  postCode: string;
  zoneCode: string;
  fetchBoardDataList?: Pick<IQuery, "fetchBoard">;
  onWriterChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onTitleChanged: (event: ChangeEvent<HTMLInputElement>) => void;
  onContentsChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onSubmitUpdate: () => void;
  onClickPostCode: () => void;
}

export interface ISubmitBtnProps {
  isActive: boolean;
}
