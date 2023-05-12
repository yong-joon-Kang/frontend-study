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
  isEdit: boolean;
  id: string;
  setIsEditArr: Dispatch<SetStateAction<boolean[]>> | undefined;
  index: number;
}

export interface editContentsProps {
  editContents?: string;
}

export interface ICurrLengthProps {
  length: string;
}

export interface IProps extends editProps {
  // isEdit?: boolean;
  // id?: string;
  contents?: string;
  // index?: number;
  isEditArr?: boolean[];
  // setIsEditArr?: Dispatch<SetStateAction<boolean[]>>;
  isAnswer?: boolean;
  setIsAnswer?: Dispatch<SetStateAction<boolean>>;
  useditemQuestionId?: string;
}

// export interface IAnswer {
//   isAnswer?: boolean;
//   id: string;
//   isEdit: boolean;
//   contents: string;
//   useditemQuestionId?: string;
//   index: number;
//   isEditArr: boolean[];
//   setIsEditArr: Dispatch<SetStateAction<boolean[]>>;
// }

// export interface IProps {
//   isAnswer?: boolean;
//   useditemQuestionId?: string;
//   isEdit?: boolean;
//   id?: string;
//   contents?: string;
//   index?: number;
//   isEditArr?: boolean[];
//   setIsEditArr?: Dispatch<SetStateAction<boolean[]>>;
// }
