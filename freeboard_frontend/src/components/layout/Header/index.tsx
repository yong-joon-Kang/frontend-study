import styled from "@emotion/styled";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  userInfoState,
} from "../../../commons/libraries/recoil";
import { Drawer, Modal } from "antd";
import NavMenu from "../NavMenu";
import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";
import { useMutation, gql } from "@apollo/client";

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 추가 */
  box-shadow: 0 4px 4px -4px black;
  height: 40px;
  z-index: 1;
`;

const SideWrap = styled.div`
  padding: 10px 50px;
  text-align: ${(props: cssProps) =>
    props.isMenu ? "left" : props.isLogin ? "right" : "center"};
  flex: 1; /* 추가 */
`;

const LabelWrap = styled.span`
  ${(props: cssProps) =>
    props.isPseudo
      ? `&::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 14px;
    background-color: #ababab;
    vertical-align: -1px;
    margin: 0 15px;
  }`
      : null}
`;

const Label = styled.span`
  cursor: pointer;
`;

interface cssProps {
  isPseudo?: boolean;
  isMenu?: boolean;
  isLogin?: boolean;
}

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

function Header() {
  const { onClickMoveToPage } = useMoveToPage();
  const [open, setOpen] = useState(false);

  const [userInfo] = useRecoilState(userInfoState);
  const [accessToken] = useRecoilState(accessTokenState);

  const [logoutUser] = useMutation(LOGOUT_USER);
  const onClickOk = async () => {
    try {
      if (accessToken) await logoutUser();
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }

    localStorage.setItem("accessToken", "");
    location.reload();
  };

  const onClickLogOut = async () => {
    Modal.confirm({
      onOk: onClickOk,
      content: "로그아웃 하시겠습니까?",
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <HeaderWrap>
      <SideWrap isMenu={true}>
        <Label onClick={showDrawer}>Menu</Label>
        <Drawer placement="left" onClose={onClose} open={open}>
          <NavMenu />
        </Drawer>
      </SideWrap>
      <SideWrap>
        <Label onClick={onClickMoveToPage("/")}>Main</Label>
      </SideWrap>
      <SideWrap isLogin={true}>
        <LabelWrap>
          <Label
            onClick={() => {
              accessToken ? onClickLogOut() : onClickMoveToPage("/signIn")();
            }}
          >
            {accessToken ? "로그아웃" : "로그인"}
          </Label>
        </LabelWrap>
        <LabelWrap isPseudo={true}>
          <Label
            onClick={() => {
              accessToken
                ? onClickMoveToPage("/myPage")()
                : onClickMoveToPage("/signUp")();
            }}
          >
            {accessToken ? `${userInfo.name}님` : "회원가입"}
          </Label>
        </LabelWrap>
      </SideWrap>
    </HeaderWrap>
  );
}

export default Header;
