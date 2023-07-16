import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../commons/libraries/recoil";
import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";

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

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ProfileRadius = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 150px 0 80px 0;
  cursor: pointer;
`;

const NavMenu = () => {
  const { onClickMoveToPage } = useMoveToPage();
  const [userInfo] = useRecoilState(userInfoState);

  return (
    <Wrap>
      <ProfileRadius onClick={onClickMoveToPage("/myPage")}>
        <ProfileImg
          src={
            userInfo.picture
              ? `https://storage.googleapis.com/${userInfo.picture}`
              : "/profileDef.png"
          }
        />
      </ProfileRadius>
      <NavigateWrap>
        <Ul>
          <Li onClick={onClickMoveToPage("/boards/list")}>게시판</Li>
          <Li onClick={onClickMoveToPage("/usedItems/list")}>중고마켓</Li>
          <Li onClick={onClickMoveToPage("/OpenApi")}>Open Api</Li>
          <Li onClick={onClickMoveToPage("/FireBase")}>FireBase</Li>
        </Ul>
      </NavigateWrap>
    </Wrap>
  );
};

export default NavMenu;
