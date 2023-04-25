import { IQuery } from "../../../commons/types/generated/types";
import { ChangeEvent } from "react";

export interface IBoardListPresenterPageProps {
  hasMore: boolean | undefined;
  onLoadMore: () => void;
  setEndDate: any;
  setStartDate: any;
  minDate: any;
  maxDate: any;
  data?: Pick<IQuery, "fetchUseditems">;
  onClickOneRow: (arg0: any) => void;
  onClickWrite: () => void;
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
