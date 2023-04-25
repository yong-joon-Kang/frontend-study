import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const logOutState = atom({
  key: "logOutState",
  default: false,
});

export const userNameState = atom({
  key: "userNameState",
  default: "",
});
