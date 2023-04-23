import { IQuery } from "../../../commons/types/generated/types";

export interface IUsedItemsDetailPresenterPageProps {
  data?: Pick<IQuery, "fetchUseditem">;
  onClickUsedItemsList: () => void;
  onClickInCart: (arg0: string) => void;
  onClickUsedItemsEdit: () => void;
  onClickCountLike: () => void;
  onClickCountDislike: () => void;
  onToggleModal: () => void;
}

export interface LikeType {
  isLikeIcon: boolean;
}
