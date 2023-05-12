import { IUseditemQuestion } from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface IProps {
  el: IUseditemQuestion;
  index: number;
  onClickUpdate: (event: MouseEvent<HTMLImageElement>) => void;
  onToggleModal: (event: MouseEvent<HTMLImageElement>) => void;
}
