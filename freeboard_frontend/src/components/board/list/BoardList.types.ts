import { IQuery } from "../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface IBoardListPresenterPageProps {
  data?: Pick<IQuery, "fetchBoards">;
  onClickBoardDetail: (event: MouseEvent<HTMLDivElement>) => void;
  onClickBoardWrite: () => void;
}

export interface ITrProps {
  pointer?: string;
  hvBgColor?: string;
}

export interface IThProps {
  width?: string;
}
