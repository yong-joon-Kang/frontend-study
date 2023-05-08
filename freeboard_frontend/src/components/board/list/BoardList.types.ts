import { IQuery } from "../../../commons/types/generated/types";
import { ChangeEvent, MouseEvent } from "react";

export interface IBoardListPresenterPageProps {
  setEndDate: any;
  setStartDate: any;
  minDate: any;
  maxDate: any;
  data?: Pick<IQuery, "fetchBoards">;
  onClickBoardDetail: (event: MouseEvent<HTMLDivElement>) => void;
  onClickBoardWrite: () => void;
  onChangeSearchKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeStartDate: (date: any) => void;
  onChangeEndDate: (date: any) => void;
  startDate: any;
  endDate: any;
  searchKeyword: string;
}

export interface ITrProps {
  pointer?: string;
  hvBgColor?: string;
}

export interface IThProps {
  width?: string;
}

export interface IKeywordProps {
  keyword?: boolean;
}
