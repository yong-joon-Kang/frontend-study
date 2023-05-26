import { IQuery } from "../../../commons/types/generated/types";

export interface IBoardDetailPresenterPageProps {
  data?: Pick<IQuery, "fetchBoard">;
  onClickMoveToPage: (page: string) => () => void;
  onClickCountLike: () => void;
  onClickCountDislike: () => void;
  onToggleModal: () => void;
  router: any;
}

export interface LikeType {
  isLikeIcon: boolean;
}
