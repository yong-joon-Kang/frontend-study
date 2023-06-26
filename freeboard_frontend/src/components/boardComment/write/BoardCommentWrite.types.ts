import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IBoardCommentPresenterPageProps {
  onClickCmtWrite: () => void;
  onChangeTextArea: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePw: (event: ChangeEvent<HTMLInputElement>) => void;
  contents: string;
  contentsLength: string;
  writer: string;
  password: string;
  isEdit: boolean;
  setRateCnt: Dispatch<SetStateAction<number>>;
  id: string;
  editWriter: string | undefined | null;
  editContents: string;
  editRating: number;
  isEditArr: boolean[];
  setIsEditArr: Dispatch<SetStateAction<boolean[]>>;
  index: number;
}

export interface ICurrLengthProps {
  length: string;
}

export interface IEditComment {
  isEdit: boolean;
  id: string;
  writer: string | undefined | null;
  contents: string;
  rating: number;
  index: number;
  isEditArr: boolean[];
  setIsEditArr: Dispatch<SetStateAction<boolean[]>>;
}
