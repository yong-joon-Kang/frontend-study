/* eslint-disable react/display-name */
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../../commons/libraries/recoil";
import { useRecoilState, useRecoilValueLoadable } from "recoil";

export const WithAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  const [accessToken] = useRecoilState(accessTokenState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  useEffect(() => {
    if (!accessToken)
      aaa.toPromise().then((newAccessToken) => {
        console.log(newAccessToken);
        if (!newAccessToken) {
          Modal.error({ content: "로그인 후 이용가능합니다!" });
          router.push("/signIn");
        }
      });
  }, []);
  return <Component {...props} />;
};
