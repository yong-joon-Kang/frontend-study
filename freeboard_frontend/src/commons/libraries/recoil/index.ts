import { getAccessToken } from "../getAccessToken";
import { IUser } from "./../../types/generated/types";
import { atom, selector } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const userInfoState = atom<IUser>({
  key: "userInfoState",
  default: Object.create(null) as IUser,
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});
