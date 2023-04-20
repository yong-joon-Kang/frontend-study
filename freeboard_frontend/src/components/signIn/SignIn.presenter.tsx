import * as S from "./SignIn.styles";
import { ISignInContainerProps } from "./SignIn.types";

function SignUpPresenter(props: ISignInContainerProps) {
  return (
    <S.Wrap>
      <S.SubWrap>
        <S.Label>이메일</S.Label>
        <S.Input onChange={props.onChangeEmail} />
        <S.ErrorMsg>{props.errorInfo.emailError}</S.ErrorMsg>
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>비밀번호</S.Label>
        <S.Input type="password" onChange={props.onChangePassword} />
        <S.ErrorMsg>{props.errorInfo.passwordError}</S.ErrorMsg>
      </S.SubWrap>

      <S.SubWrap>
        <S.SignUpBtn isAbled={props.isAbled} onClick={props.onClickSignIn}>
          로그인
        </S.SignUpBtn>
      </S.SubWrap>
    </S.Wrap>
  );
}

export default SignUpPresenter;
