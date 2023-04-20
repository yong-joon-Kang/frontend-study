import { ChangeEvent } from "react";
export interface ISignUpContainerProps {
  info: { email: string; password: string; pwChk: string; name: string };
  errorInfo: {
    emailError: string;
    passwordError: string;
    pwChkError: string;
    nameError: string;
  };
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePwChk: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSignUp: () => void;
  isAbled: boolean | "";
}

export interface ISignUpBtnProps {
  isAbled: boolean | "";
}
