import { IQuery } from "../../../commons/types/generated/types";

export interface IBoardListPresenterPageProps {
  data?: Pick<IQuery, "fetchBoards">;
  onClickBoardDetail: (arg0: string) => void;
  onClickBoardWrite: () => void;
}

export interface ITrProps {
  pointer?: string;
  hvBgColor?: string;
}

export interface IThProps {
  width?: string;
}
