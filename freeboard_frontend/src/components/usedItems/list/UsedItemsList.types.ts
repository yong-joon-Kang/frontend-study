import { IQuery } from "../../../commons/types/generated/types";
import { ChangeEvent, MouseEvent } from "react";

export interface IBoardListPresenterPageProps {
  setEndDate: any;
  setStartDate: any;
  minDate: any;
  maxDate: any;
  data?: Pick<IQuery, "fetchUseditems">;
  onClickOneRow: (event: MouseEvent<HTMLDivElement>) => void;
  onClickBoardWrite: () => void;
  onChangeSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
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
