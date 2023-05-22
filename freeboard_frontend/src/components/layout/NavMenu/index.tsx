import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../commons/libraries/recoil";
import { useRouter } from "next/router";

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
  width: 120px;
  height: 120px;
`;

export const ProfileRadius = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid #bbb;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 150px 0 80px 0;
  cursor: pointer;
`;

interface ILayoutProps {
  onClickNavMenu: (arg0: string) => void;
}

// eslint-disable-next-line react/display-name
const NavMenu = (props: ILayoutProps) => {
  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoState);

  return (
    <Wrap>
      <ProfileRadius
        onClick={() => {
          router.push("/myPage");
        }}
      >
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
