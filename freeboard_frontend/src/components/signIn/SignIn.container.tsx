import { ChangeEvent, useState, useMemo } from "react";
import SignInPresenter from "./SignIn.presenter";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./SignIn.queries";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../commons/libraries/recoil";

function SignInContainer() {
  const router = useRouter();
  const [, setaccessToken] = useRecoilState(accessTokenState);

  const [loginUser] = useMutation(LOGIN_USER);

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [errorInfo, setErrorInfo] = useState({
    emailError: "",
    passwordError: "",
  });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, email: event.target.value });

    if (!event.target.value) {
      setErrorInfo({ ...errorInfo, emailError: "" });
      return;
    }

    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const resultReg = emailRegEx.test(event.target.value);
    if (resultReg) {
      setErrorInfo({ ...errorInfo, emailError: "" });
    } else {
      setErrorInfo({
        ...errorInfo,
        emailError: "이메일 형식이 맞지 않습니다.",
      });
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, password: event.target.value });

    if (!event.target.value) {
      setErrorInfo({ ...errorInfo, passwordError: "" });
      return;
    }

    const passwordRegEx =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const resultReg = passwordRegEx.test(event.target.value);
    if (resultReg) {
      setErrorInfo({ ...errorInfo, passwordError: "" });
    } else {
      setErrorInfo({
        ...errorInfo,
        passwordError: "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.",
      });
    }
  };

  const onClickSignIn = async () => {
    console.log("??");
    if (!isAbled) return;
    try {
      const result = await loginUser({
        variables: {
          email: info.email,
          password: info.password,
        },
      });
      // console.log(result.data.loginUser.accessToken);
      setaccessToken(result.data.loginUser.accessToken);
      Modal.info({ content: "로그인에 성공하였습니다!" });

      router.push("/test");
    } catch (error) {
      if (error instanceof Error)
        Modal.error({
          content: error.message,
        });
    }
  };

  const isAbled = useMemo(
    () =>
      info.email &&
      info.password &&
      !errorInfo.emailError &&
      !errorInfo.passwordError,
    [info]
  );
  return (
    <SignInPresenter
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onClickSignIn={onClickSignIn}
      info={info}
      errorInfo={errorInfo}
      isAbled={isAbled}
    />
  );
}

export default SignInContainer;
