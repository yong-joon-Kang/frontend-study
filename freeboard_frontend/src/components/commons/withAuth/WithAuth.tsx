/* eslint-disable react/display-name */
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  accessTokenState,
  loginState,
} from "../../../commons/libraries/recoil";
import { useRecoilState } from "recoil";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";

export const WithAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const [isLogin] = useRecoilState(loginState);

  useEffect(() => {
    getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });

    if (!isLogin) {
      Modal.error({ content: "로그인 후 이용가능합니다!" });
      router.push("/signIn");
    }
  }, []);
  return <Component {...props} />;
};
