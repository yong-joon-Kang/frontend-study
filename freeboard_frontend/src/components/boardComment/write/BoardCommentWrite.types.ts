import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IBoardCommentPresenterPageProps {
  onClickCmtWrite: () => void;
  onChangeTextArea: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePw: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickUpdate: () => void;
  onClickDelete: () => void;
  contents: string;
  contentsLength: string;
  writer: string;
  password: string;
  isEdit: boolean;
  setRateCnt: Dispatch<SetStateAction<number>>;
}

export interface ICurrLengthProps {
  length: string;
}
