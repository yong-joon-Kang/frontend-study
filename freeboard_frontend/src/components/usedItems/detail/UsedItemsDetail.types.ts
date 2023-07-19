import { IQuery, IUseditem } from "../../../commons/types/generated/types";

export interface IUsedItemsDetailPresenterPageProps {
  userName: string;
  data?: Pick<IQuery, "fetchUseditem">;
  onClickInCart: (arg0: IUseditem) => void;
  onClickUsedItemsEdit: () => void;
  onClickCountLike: () => void;
  onToggleModal: () => void;
  onClickUsedItemsDelete: () => void;
}

export interface LikeType {
  isLikeIcon: boolean;
}

export interface cssProps {
  isBottomLine: boolean;
}
