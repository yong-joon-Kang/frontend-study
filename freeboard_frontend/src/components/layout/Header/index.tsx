import styled from "@emotion/styled";

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 4px -4px black;
  height: 40px;
  z-index: 2;
`;

const SideWrap = styled.div`
  padding: 10px 50px;
  cursor: ${(props: cssProps) => (props.isCursor ? "pointer" : "")};
`;

interface cssProps {
  isPseudo?: boolean;
  isCursor?: boolean;
}

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

function Header(props: ILayoutProps) {
  return (
    <HeaderWrap>
      <SideWrap isCursor={true} onClick={props.onClickMenu}>
        Menu
      </SideWrap>
      <SideWrap isCursor={true}>Main</SideWrap>
      <SideWrap>
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
