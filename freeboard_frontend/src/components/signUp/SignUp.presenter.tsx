import * as S from "./SignUp.styles";
import { ISignUpContainerProps } from "./SignUp.types";

function SignUpPresenter(props: ISignUpContainerProps) {
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
        <S.Label>비밀번호 확인</S.Label>
        <S.Input type="password" onChange={props.onChangePwChk} />
        <S.ErrorMsg>{props.errorInfo.pwChkError}</S.ErrorMsg>
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>이름</S.Label>
        <S.Input onChange={props.onChangeName} />
        <S.ErrorMsg>{props.errorInfo.nameError}</S.ErrorMsg>
      </S.SubWrap>
      <S.SubWrap>
        <S.SignUpBtn isAbled={props.isAbled} onClick={props.onClickSignUp}>
          회원가입
        </S.SignUpBtn>
      </S.SubWrap>
    </S.Wrap>
  );
}

export default SignUpPresenter;
