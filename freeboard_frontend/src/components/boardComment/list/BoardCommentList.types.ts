import { IQuery } from "../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface IBoardCommentListPresenterPageProps {
  data?: Pick<IQuery, "fetchBoardComments">;
  onClickUpdate: (event: MouseEvent<HTMLImageElement>) => void;
  onClickDelete: (event: MouseEvent<HTMLImageElement>) => void;
  isEdit: boolean;
}

// export interface IEvent {
//   target: {
//     id: string;
//   };
// }
