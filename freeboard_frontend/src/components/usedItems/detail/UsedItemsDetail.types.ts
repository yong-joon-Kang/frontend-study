import { IQuery } from "../../../commons/types/generated/types";

export interface IUsedItemsDetailPresenterPageProps {
  userName: string;
  data?: Pick<IQuery, "fetchUseditem">;
  onClickUsedItemsList: () => void;
  onClickInCart: () => void;
  onClickUsedItemsEdit: () => void;
  onClickCountLike: () => void;
  onClickCountDislike: () => void;
  onToggleModal: () => void;
}

export interface LikeType {
  isLikeIcon: boolean;
}
