import styled from "@emotion/styled";

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 추가 */
  box-shadow: 0 4px 4px -4px black;
  height: 40px;
  z-index: 2;
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

function Header(props: ILayoutProps) {
  return (
    <HeaderWrap>
      <SideWrap isMenu={true} onClick={props.onClickMenu}>
        <Label>Menu</Label>
      </SideWrap>
      <SideWrap>
        <Label>Main</Label>
      </SideWrap>
      <SideWrap isLogin={true}>
        <LabelWrap>
          <Label>로그인</Label>
        </LabelWrap>
        <LabelWrap isPseudo={true}>
          <Label>회원가입</Label>
        </LabelWrap>
      </SideWrap>
    </HeaderWrap>
  );
}

export default Header;
