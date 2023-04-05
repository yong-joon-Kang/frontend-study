import { MouseEvent } from "react";

export interface IProps {
  refetch: any;
  count: number | undefined;
}

export interface IContainerProps {
  activedPage: number;
  lastPageNum: number;
  startPage: number;
  onClickPage: (event: MouseEvent<HTMLSpanElement>) => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}

export interface IPageProps {
  isActive: boolean;
}
