import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";

import { useRecoilState } from "recoil";
import {
  accessTokenState,
  logOutState,
  userInfoState,
} from "../../../commons/libraries/recoil";
import { Drawer, Modal } from "antd";
import NavMenu from "../NavMenu";

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

function Header() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [, setLogOutState] = useRecoilState(logOutState);

  const onClickOk = () => {
    setAccessToken("");
    setLogOutState(true);
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

  const onClickNavMenu = (menuName: string) => {
    if (menuName === "boardList") {
      router.push("/boards/list");
    } else if (menuName === "usedItems") {
      router.push("/usedItems/list");
    } else if (menuName === "OpenApi") {
      router.push("/OpenApi");
    } else if (menuName === "FireBase") {
      router.push("/FireBase");
    }
  };

  return (
    <HeaderWrap>
      <SideWrap isMenu={true}>
        <Label onClick={showDrawer}>Menu</Label>
        <Drawer placement="left" onClose={onClose} open={open}>
          <NavMenu onClickNavMenu={onClickNavMenu} />
        </Drawer>
      </SideWrap>
      <SideWrap>
        <Label
          onClick={() => {
            router.push("/");
          }}
        >
          Main
        </Label>
      </SideWrap>
      <SideWrap isLogin={true}>
        <LabelWrap>
          <Label
            onClick={() => {
              accessToken ? onClickLogOut() : router.push("/signIn");
            }}
          >
            {accessToken ? "로그아웃" : "로그인"}
          </Label>
        </LabelWrap>
        <LabelWrap isPseudo={true}>
          <Label
            onClick={() => {
              accessToken ? router.push("/myPage") : router.push("/signUp");
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
