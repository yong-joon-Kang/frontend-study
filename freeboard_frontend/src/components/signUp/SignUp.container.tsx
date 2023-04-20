import { ChangeEvent, useState, useMemo } from "react";
import SignUpPresenter from "./SignUp.presenter";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./SignUp.queries";
import { Modal } from "antd";
import { useRouter } from "next/router";

function SignUpContainer() {
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);

  const [info, setInfo] = useState({
    email: "",
    password: "",
    pwChk: "",
    name: "",
  });

  const [errorInfo, setErrorInfo] = useState({
    emailError: "",
    passwordError: "",
    pwChkError: "",
    nameError: "",
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

    if (info.pwChk)
      if (event.target.value === info.pwChk) {
        setErrorInfo({ ...errorInfo, pwChkError: "" });
      } else {
        setErrorInfo({
          ...errorInfo,
          pwChkError: "비밀번호가 일치하지 않습니다.",
        });
      }
  };

  const onChangePwChk = (event: ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, pwChk: event.target.value });

    if (!event.target.value) {
      setErrorInfo({ ...errorInfo, pwChkError: "" });
      return;
    }

    if (event.target.value === info.password) {
      setErrorInfo({ ...errorInfo, pwChkError: "" });
    } else {
      setErrorInfo({
        ...errorInfo,
        pwChkError: "비밀번호가 일치하지 않습니다.",
      });
    }
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, name: event.target.value });

    if (!event.target.value) {
      setErrorInfo({ ...errorInfo, nameError: "" });
      return;
    }

    if (event.target.value.length < 2 || event.target.value.length > 5) {
      setErrorInfo({
        ...errorInfo,
        nameError: "이름은 2~5 글자만 입력이 가능합니다.",
      });
    } else {
      setErrorInfo({ ...errorInfo, nameError: "" });
    }
  };

  const onClickSignUp = async () => {
    if (!isAbled) return;
    try {
      await createUser({
        variables: {
          createUserInput: {
            email: info.email,
            password: info.password,
            name: info.name,
          },
        },
      });
      router.push("/signUpSuccess");
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
      info.pwChk &&
      info.name &&
      !errorInfo.emailError &&
      !errorInfo.passwordError &&
      !errorInfo.pwChkError &&
      !errorInfo.nameError,
    [info]
  );
  return (
    <SignUpPresenter
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onChangePwChk={onChangePwChk}
      onChangeName={onChangeName}
      onClickSignUp={onClickSignUp}
      info={info}
      errorInfo={errorInfo}
      isAbled={isAbled}
    />
  );
}

export default SignUpContainer;
