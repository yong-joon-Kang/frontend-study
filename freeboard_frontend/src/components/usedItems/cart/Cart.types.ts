import { ChangeEvent } from "react";
export interface IProps {
  allChecked: boolean;
  cartData: any;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  cartInfo: object[];
  onClickQuantityBtn: (index: number, unit: string) => void;
}
