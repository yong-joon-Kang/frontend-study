import { IBoardComment } from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface ICommentList {
  el: IBoardComment;
  index: number;
  onClickUpdate: (event: MouseEvent<HTMLImageElement>) => void;
  onToggleModal: (event: MouseEvent<HTMLImageElement>) => void;
}
