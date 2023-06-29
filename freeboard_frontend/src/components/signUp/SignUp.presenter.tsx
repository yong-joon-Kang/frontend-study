import * as S from "./SignUp.styles";
import { ISignUpContainerProps } from "./SignUp.types";

function SignUpPresenter(props: ISignUpContainerProps) {
  return (
    <S.Wrap>
      <S.SubWrap>
        <S.Input onChange={props.onChangeEmail} placeholder="이메일" />
        <S.ErrorMsg>{props.errorInfo.emailError}</S.ErrorMsg>
      </S.SubWrap>
      <S.SubWrap>
        <S.Input
          type="password"
          onChange={props.onChangePassword}
          placeholder="비밀번호"
        />
        <S.ErrorMsg>{props.errorInfo.passwordError}</S.ErrorMsg>
      </S.SubWrap>
      <S.SubWrap>
        <S.Input
          type="password"
          onChange={props.onChangePwChk}
          placeholder="비밀번호 확인"
        />
        <S.ErrorMsg>{props.errorInfo.pwChkError}</S.ErrorMsg>
      </S.SubWrap>
      <S.SubWrap>
        <S.Input onChange={props.onChangeName} placeholder="이름" />
        <S.ErrorMsg>{props.errorInfo.nameError}</S.ErrorMsg>
      </S.SubWrap>
      <S.SignUpBtn isAbled={props.isAbled} onClick={props.onClickSignUp}>
        회원가입
      </S.SignUpBtn>
    </S.Wrap>
  );
}

export default SignUpPresenter;
