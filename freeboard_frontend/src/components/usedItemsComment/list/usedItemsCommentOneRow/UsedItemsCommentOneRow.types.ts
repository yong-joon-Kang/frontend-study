import {
  IUseditemQuestion,
  IUseditemQuestionAnswer,
} from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface IProps {
  isAnswer: boolean;
  el: IUseditemQuestion | IUseditemQuestionAnswer;
  index: number;
  onClickUpdate: (event: MouseEvent<HTMLImageElement>) => void;
  onToggleModal: (event: MouseEvent<HTMLImageElement>) => void;
}
