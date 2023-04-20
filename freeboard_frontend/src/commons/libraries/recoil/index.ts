import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const userNameState = atom({
  key: "userNameState",
  default: "",
});
