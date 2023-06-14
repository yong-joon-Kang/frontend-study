import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../../../components/signIn/SignIn.queries";
import {
  accessTokenState,
  loginState,
  userInfoState,
} from "../../libraries/recoil";
import { IQuery } from "../../types/generated/types";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export function useLogined() {
  const [, setUserInfo] = useRecoilState(userInfoState);
  const [isLogin] = useRecoilState(loginState);
  const [accessToken] = useRecoilState(accessTokenState);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  // console.log("useLogined=============================");
  // console.log(data);
  // console.log("isLogin=============================");
  // console.log(isLogin);
  // console.log("accessToken=============================");
  // console.log(accessToken);

  useEffect(() => {
    if (accessToken) {
      if (data) {
        setUserInfo(data?.fetchUserLoggedIn);
      }
    }
  }, [isLogin, data]);
}
