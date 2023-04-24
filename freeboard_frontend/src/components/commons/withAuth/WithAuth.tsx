/* eslint-disable react/display-name */
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const WithAuth = (Component: any) => (props: any) => {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      Modal.error({ content: "로그인 후 이용가능합니다!" });
      router.push("/signIn");
    }
  }, []);
  return <Component {...props} />;
};
