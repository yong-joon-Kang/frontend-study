import { IQuery } from "../../../commons/types/generated/types";

export interface IBoardDetailPresenterPageProps {
  data?: Pick<IQuery, "fetchBoard">;
  onClickBoardList: () => void;
  onClickBoardEdit: () => void;
  onClickCountLike: () => void;
  onClickCountDislike: () => void;
  onToggleModal: () => void;
}

export interface LikeType {
  isLikeIcon: boolean;
}
