import React from "react";
import * as S from "./MyProfile.styles";
import DefaultButton from "../../commons/button/DefaultButton";

function MyProfileContainer() {
  return (
    <S.Wrap>
      <S.Title>비밀번호 변경</S.Title>
      <S.RowWrap>
        <S.Label>현재 비밀번호</S.Label>
        <S.Input placeholder="현재 비밀번호를 입력해주세요." />
      </S.RowWrap>
      <S.RowWrap>
        <S.Label>새 비밀번호</S.Label>
        <S.Input placeholder="새 비밀번호를 입력해주세요." />
      </S.RowWrap>
      <S.RowWrap>
        <S.Label>새 비밀번호 확인</S.Label>
        <S.Input placeholder="새 비밀번호 확인을 입력해주세요." />
      </S.RowWrap>
      <DefaultButton />
    </S.Wrap>
  );
}

export default MyProfileContainer;
