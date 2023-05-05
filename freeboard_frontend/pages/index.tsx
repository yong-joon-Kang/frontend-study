import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../src/components/signIn/SignIn.queries";
import { userNameState } from "../src/commons/libraries/recoil";
import { IQuery } from "../src/commons/types/generated/types";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function Home() {
  const [, setUserName] = useRecoilState(userNameState);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  if (data) setUserName(data?.fetchUserLoggedIn.name);

  useEffect(() => {
    setUserName(data?.fetchUserLoggedIn.name ?? "");
    localStorage.setItem("userName", data?.fetchUserLoggedIn.name ?? "");
  }, []);

  return <div></div>;
}

export default Home;
