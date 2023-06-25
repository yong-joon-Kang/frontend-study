import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from "react";
export interface IProps {
  onChangeAll: ChangeEventHandler<HTMLInputElement> | undefined;
  onClickDelete: MouseEventHandler<HTMLDivElement> | undefined;
  onChangeOne: any;
  allChecked: boolean;
  cartData: any;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  onClickQuantityBtn: (index: number, unit: string) => void;
}

export interface OneItemsProps {
  onChangeInput: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  onClickQuantityBtn: (index: number, arg1: string) => void;
  onChangeOne: (index: number) => void;
  index: number;
  el: any;
}
