import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../../../components/signIn/SignIn.queries";
import { userInfoState } from "../../libraries/recoil";
import { IQuery } from "../../types/generated/types";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export function useLogined() {
  const [, setUserInfo] = useRecoilState(userInfoState);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  if (data) setUserInfo(data?.fetchUserLoggedIn);
  console.log(data?.fetchUserLoggedIn);
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(data?.fetchUserLoggedIn));
  }, [data?.fetchUserLoggedIn.name]);
}
