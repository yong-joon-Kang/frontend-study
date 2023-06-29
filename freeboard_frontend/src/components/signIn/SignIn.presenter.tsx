import * as S from "./SignIn.styles";
import { ISignInContainerProps } from "./SignIn.types";

function SignUpPresenter(props: ISignInContainerProps) {
  return (
    <S.Wrap>
      <S.SubWrap>
        {/* <S.Label>이메일</S.Label> */}
        <S.Input onChange={props.onChangeEmail} placeholder="이메일" />
        <S.ErrorMsg>{props.errorInfo.emailError}</S.ErrorMsg>
      </S.SubWrap>
      <S.SubWrap>
        {/* <S.Label>비밀번호</S.Label> */}
        <S.Input
          type="password"
          onChange={props.onChangePassword}
          placeholder="비밀번호"
        />
        <S.ErrorMsg>{props.errorInfo.passwordError}</S.ErrorMsg>
      </S.SubWrap>
      <div style={{ display: "flex", margin: "30px 0" }}>
        <input type="checkbox" style={{ width: "20px", height: "20px" }} />
        &nbsp; 로그인 상태 유지
      </div>
      <S.SubWrap>
        <S.SignUpBtn isAbled={props.isAbled} onClick={props.onClickSignIn}>
          로그인
        </S.SignUpBtn>
      </S.SubWrap>
    </S.Wrap>
  );
}

export default SignUpPresenter;
