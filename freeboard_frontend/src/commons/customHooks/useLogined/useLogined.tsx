import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../../../components/signIn/SignIn.queries";
import { accessTokenState, userInfoState } from "../../libraries/recoil";
import { IQuery } from "../../types/generated/types";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export function useLogined() {
  const [, setUserInfo] = useRecoilState(userInfoState);
  const [accessToken] = useRecoilState(accessTokenState);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  useEffect(() => {
    if (accessToken) {
      if (data) {
        setUserInfo(data?.fetchUserLoggedIn);
      }
    }
  }, [data]);
}
