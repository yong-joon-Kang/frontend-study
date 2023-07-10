import React, { ChangeEvent, useMemo, useState } from "react";
import * as S from "./MyProfile.styles";
import { useMutation } from "@apollo/client";
import { RESET_USER_PASSWORD } from "./PasswordChange.queries";
import DefaultButton from "../../commons/button/DefaultButton";
import { Modal } from "antd";

function MyProfileContainer() {
  const [pw, setPw] = useState("");
  const [pwChk, setPwChk] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [isActive, setIsActive] = useState(false);

  const [resetUserPassword] = useMutation(RESET_USER_PASSWORD);
  const onChangePw = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
    if (pwChk && event.target.value !== pwChk) {
      setErrMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setErrMsg("");
    }
  };

  const onChangePwChk = (event: ChangeEvent<HTMLInputElement>) => {
    setPwChk(event.target.value);
    if (event.target.value !== pw) {
      setErrMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setErrMsg("");
    }
  };

  const onClickBtn = () => {
    if (!isActive) return false;
    const passwordRegEx =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const resultReg = passwordRegEx.test(pw);
    console.log(resultReg);
    if (!resultReg) {
      Modal.warning({
        title: "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.",
      });
      return false;
    } else {
      Modal.success({
        title: "비밀번호가 정상적으로 변경되었습니다!",
      });
    }

    resetUserPassword({
      variables: {
        password: pw,
      },
    });
  };

  const isActive = useMemo(() => pw && pwChk && pw === pwChk, [pw, pwChk]);

  return (
    <S.Wrap>
      <S.Title>비밀번호 변경</S.Title>
      <S.RowWrap>
        <S.Label>새 비밀번호</S.Label>
        <S.Input
          type="password"
          placeholder="새 비밀번호를 입력해주세요."
          onChange={onChangePw}
        />
      </S.RowWrap>
      <S.RowWrap>
        <S.Label>새 비밀번호 확인</S.Label>
        <S.Input
          type="password"
          placeholder="새 비밀번호 확인을 입력해주세요."
          onChange={onChangePwChk}
        />
      </S.RowWrap>
      <div style={{ height: "30px", color: "red" }}>{errMsg}</div>
      <S.RowWrap isLast={true}>
        <DefaultButton
          text="비밀번호 변경"
          isActive={Boolean(isActive)}
          onClick={onClickBtn}
          margin="0"
        />
      </S.RowWrap>
    </S.Wrap>
  );
}

export default MyProfileContainer;
