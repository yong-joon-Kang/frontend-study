import styled from "@emotion/styled";

const Wrap = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavigateWrap = styled.div`
  width: 100%;
`;

const Ul = styled.div`
  width: 100%;
  padding: 0;
`;

const Li = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Profile = styled.div`
  border: 1px solid;
  border-radius: 100px;
  height: 150px;
  width: 150px;
  margin: 150px 0 80px 0;
`;

interface ILayoutProps {
  onClickNavMenu: (arg0: string) => void;
}

// eslint-disable-next-line react/display-name
const NavMenu = (props: ILayoutProps) => {
  return (
    <Wrap>
      <Profile></Profile>
      <NavigateWrap>
        <Ul>
          <Li
            onClick={() => {
              props.onClickNavMenu("boardList");
            }}
          >
            게시판
          </Li>
          <Li
            onClick={() => {
              props.onClickNavMenu("usedItems");
            }}
          >
            중고마켓
          </Li>
          <Li
            onClick={() => {
              props.onClickNavMenu("OpenApi");
            }}
          >
            Open Api
          </Li>
          <Li
            onClick={() => {
              props.onClickNavMenu("FireBase");
            }}
          >
            FireBase
          </Li>
        </Ul>
      </NavigateWrap>
    </Wrap>
  );
};

export default NavMenu;
