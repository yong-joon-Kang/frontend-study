import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { userNameState } from "../../../commons/libraries/recoil";

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

interface ILayoutProps {
  onClickMenu: () => void;
}

interface cssProps {
  isPseudo?: boolean;
  isMenu?: boolean;
  isLogin?: boolean;
}

// const LOG_OUT_USER = gql`
//   mutation {
//     logoutUser
//   }
// `;

function Header(props: ILayoutProps) {
  const router = useRouter();
  const [userName] = useRecoilState(userNameState);

  // const [logoutUser] = useMutation(LOG_OUT_USER);

  const onClickLogOut = async () => {
    // console.log("test");
    // const result = await logoutUser();
    // console.log(result.data.logoutUser);
    // setAccessToken("");
    // console.log(accessToken);
  };
  return (
    <HeaderWrap>
      <SideWrap isMenu={true}>
        <Label onClick={props.onClickMenu}>Menu</Label>
      </SideWrap>
      <SideWrap>
        <Label>Main</Label>
      </SideWrap>
      <SideWrap isLogin={true}>
        <LabelWrap>
          <Label
            onClick={() => {
              userName ? onClickLogOut() : router.push("/signIn");
            }}
          >
            {userName ? "로그아웃" : "로그인"}
          </Label>
        </LabelWrap>
        <LabelWrap isPseudo={true}>
          <Label
            onClick={() => {
              userName ? router.push("/") : router.push("/signUp");
            }}
          >
            {userName ? userName + "님" : "회원가입"}
          </Label>
        </LabelWrap>
      </SideWrap>
    </HeaderWrap>
  );
}

export default Header;
