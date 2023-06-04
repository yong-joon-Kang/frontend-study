import { IUser } from "./../../types/generated/types";
import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const loginState = atom({
  key: "loginState",
  default: true,
});

export const userInfoState = atom<IUser>({
  key: "userInfoState",
  default: Object.create(null) as IUser,
});
