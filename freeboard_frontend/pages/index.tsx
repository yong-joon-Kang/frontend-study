import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../src/components/signIn/SignIn.queries";
import { userInfoState } from "../src/commons/libraries/recoil";
import { IQuery } from "../src/commons/types/generated/types";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function Home() {
  const [, setUserInfo] = useRecoilState(userInfoState);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  if (data) setUserInfo(data?.fetchUserLoggedIn);
  // console.log(data?.fetchUserLoggedIn);
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(data?.fetchUserLoggedIn));
  }, [data?.fetchUserLoggedIn.name]);

  return <div></div>;
}

export default Home;
