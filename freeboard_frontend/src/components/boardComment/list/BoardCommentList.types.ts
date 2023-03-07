import { IQuery } from "../../../commons/types/generated/types";

export interface IBoardCommentListPresenterPageProps {
  data?: Pick<IQuery, "fetchBoardComments">;
  onClickUpdate: () => void;
  onClickDelete: (event: any) => void;
  isEdit: boolean;
}

export interface IEvent {
  target: {
    id: string;
  };
}
