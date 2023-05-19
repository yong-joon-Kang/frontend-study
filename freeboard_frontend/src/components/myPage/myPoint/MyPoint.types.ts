import { ChangeEvent } from "react";

export interface IContainerProps {
  data: any;
  onClickMyUseditems: () => void;
  onClickMyPick: () => void;
  clickedTab: string;
  onChangeSearchInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface cssProps {
  isName?: boolean;
  clickedTab?: string;
  isHeader?: boolean;
}
