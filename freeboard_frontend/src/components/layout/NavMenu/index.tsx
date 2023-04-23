import styled from "@emotion/styled";
import { forwardRef } from "react";

const Wrap = styled.div`
  border: 1px solid;
  position: fixed;
  height: 100%;
  width: 300px;
  left: ${(props: ILayoutProps) => (props.isToggleMenu ? "0" : "-301px")};
  transition: all 0.3s ease-in-out;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
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
  isToggleMenu: boolean;
  onClickUsedItems?: () => void;
  onClickBoardList?: () => void;
  onClickOpenApi?: () => void;
  onClickFireBase?: () => void;
}

// eslint-disable-next-line react/display-name
const NavMenu = forwardRef((props: ILayoutProps, ref: any) => {
  return (
    <Wrap isToggleMenu={props.isToggleMenu} ref={ref}>
      <Profile></Profile>
      <NavigateWrap>
        <Ul>
          <Li onClick={props.onClickBoardList}>게시판</Li>
          <Li onClick={props.onClickUsedItems}>중고마켓</Li>
          <Li onClick={props.onClickOpenApi}>Open Api</Li>
          <Li onClick={props.onClickFireBase}>FireBase</Li>
        </Ul>
      </NavigateWrap>
    </Wrap>
  );
});

export default NavMenu;
