import { ChangeEvent } from "react";
export interface ISignInContainerProps {
  info: { email: string; password: string };
  errorInfo: {
    emailError: string;
    passwordError: string;
  };
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSignIn: () => void;
  onChangeKeepLoginChk: (event: any) => void;
  isAbled: boolean | "";
}

export interface ISignUpBtnProps {
  isAbled: boolean | "";
}
