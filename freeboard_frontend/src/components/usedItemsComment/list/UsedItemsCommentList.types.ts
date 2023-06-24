import {
  IUseditemQuestion,
  IUseditemQuestionAnswer,
} from "../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface UsedItemsCommentListPresenterPageProps {
  isAnswer?: boolean;
  hasMore: boolean;
  data:
    | {
        fetchUseditemQuestions: IUseditemQuestion[];
        fetchUseditemQuestionAnswers?: never;
      }
    | {
        fetchUseditemQuestions?: never;
        fetchUseditemQuestionAnswers: IUseditemQuestionAnswer[];
      }
    | undefined;
  onLoadMore: () => void;
  onClickUpdate: (event: MouseEvent<HTMLImageElement>) => void;
  onToggleModal: (event: MouseEvent<HTMLImageElement>) => void;
  // onClickDelete: (event: MouseEvent<HTMLImageElement>) => void;
  isEditArr: boolean[];
  setIsEditArr: any;
  useditemQuestionId?: string;
}

export interface IPropsAnswerList {
  isAnswer: boolean;
  useditemQuestionId: string;
}
