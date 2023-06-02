import { IUser } from "./../../types/generated/types";
import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const logOutState = atom({
  key: "logOutState",
  default: false,
});

export const userInfoState = atom<IUser>({
  key: "userInfoState",
  default: Object.create(null) as IUser,
});
