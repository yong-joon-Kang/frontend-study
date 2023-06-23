import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IUsedItemsCommentPresenterPageProps extends editProps {
  onClickCmtWrite: () => void;
  onChangeTextArea: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  contents: string;
  contentsLength: string;
  isEditArr?: boolean[];
  isAnswer: boolean;
  onClickAnswerWrite: () => void;
}

export interface editProps extends editContentsProps {
  isEdit?: boolean;
  id?: string;
  setIsEditArr?: any;
  index?: number;
}

export interface editContentsProps {
  editContents?: string;
}

export interface ICurrLengthProps {
  length: string;
}
export interface IProps extends editProps {
  contents?: string;
  isEditArr?: boolean[];
  isAnswer?: boolean;
  setIsAnswer?: Dispatch<SetStateAction<boolean>>;
  useditemQuestionId?: string;
}
