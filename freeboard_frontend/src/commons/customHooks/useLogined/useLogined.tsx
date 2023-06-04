import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../../../components/signIn/SignIn.queries";
import { loginState, userInfoState } from "../../libraries/recoil";
import { IQuery } from "../../types/generated/types";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export function useLogined() {
  const [, setUserInfo] = useRecoilState(userInfoState);
  const [isLogin] = useRecoilState(loginState);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  // console.log(data?.fetchUserLoggedIn);
  useEffect(() => {
    if (isLogin) {
      if (data) setUserInfo(data?.fetchUserLoggedIn);
    }
  }, [data]);
}
