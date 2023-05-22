import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const logOutState = atom({
  key: "logOutState",
  default: false,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: { _id: "", name: "", picture: "" },
});
