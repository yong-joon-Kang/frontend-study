import { IQuery } from "../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface IBoardCommentListPresenterPageProps {
  hasMore: boolean;
  data?: Pick<IQuery, "fetchBoardComments">;
  onLoadMore: () => void;
  onClickUpdate: (event: MouseEvent<HTMLImageElement>) => void;
  onToggleModal: (event: MouseEvent<HTMLImageElement>) => void;
  // onClickDelete: (event: MouseEvent<HTMLImageElement>) => void;
  isEditArr: boolean[];
}
