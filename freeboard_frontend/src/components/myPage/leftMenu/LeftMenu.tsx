import * as S from "./LeftMenu.styles";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../commons/libraries/recoil";

function LeftMenu(props) {
  const [userInfo] = useRecoilState(userInfoState);
  return (
    <S.Wrap>
      <S.Title>MYPAGE</S.Title>
      <S.ProfileImg src="/profileDef.png" />
      <S.MyInfoSubWrap1>
        <S.Label isName={true}>{userInfo.name}</S.Label>
        <S.LabelWrap isWrap1={true}>
          <S.Img src="/myPoint.png" />
          <S.Label>100,000</S.Label>
        </S.LabelWrap>
      </S.MyInfoSubWrap1>
      <S.MyInfoSubWrap2>
        <S.LabelWrap>
          <S.Img src="/myCart.png" />
          <S.Label
            onClick={() => {
              props.onClickMenu("myCartPage");
            }}
          >
            내 장터
          </S.Label>
        </S.LabelWrap>
        <S.LabelWrap>
          <S.Img src="/myPointDef.png" />
          <S.Label
            onClick={() => {
              props.onClickMenu("myPoint");
            }}
          >
            내 포인트
          </S.Label>
        </S.LabelWrap>
        <S.LabelWrap>
          <S.Img src="/profileDef.png" />
          <S.Label
            onClick={() => {
              props.onClickMenu("myProfile");
            }}
          >
            내 프로필
          </S.Label>
        </S.LabelWrap>
      </S.MyInfoSubWrap2>
    </S.Wrap>
  );
}

export default LeftMenu;
