import { getDate } from "../../commons/libraries/utils";
import * as S from "./myPage.styles";
import { Col, Row } from "antd";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../commons/libraries/recoil";
import SearchInput from "../commons/searchInput/SearchInput";

function MyPagePresenter(props) {
  const [userInfo] = useRecoilState(userInfoState);
  const data =
    props.data?.fetchUseditemsISold || props.data?.fetchUseditemsIPicked;

  return (
    <S.Wrap>
      <S.MyInfoWrap>
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
            <S.Label>내 장터</S.Label>
          </S.LabelWrap>
          <S.LabelWrap>
            <S.Img src="/myPointDef.png" />
            <S.Label>내 포인트</S.Label>
          </S.LabelWrap>
          <S.LabelWrap>
            <S.Img src="/profileDef.png" />
            <S.Label>내 프로필</S.Label>
          </S.LabelWrap>
        </S.MyInfoSubWrap2>
      </S.MyInfoWrap>
      <S.MyListWrap>
        <S.ListHeader>
          <S.HeaderRightWrap>
            <S.MyUseditemsTab
              clickedTab={props.clickedTab}
              onClick={props.onClickMyUseditems}
            >
              나의상품
            </S.MyUseditemsTab>
            &nbsp; &nbsp;
            <S.MyPickedTab
              clickedTab={props.clickedTab}
              onClick={props.onClickMyPick}
            >
              마이찜
            </S.MyPickedTab>
          </S.HeaderRightWrap>
          <SearchInput
            style={S.searchInput}
            placeholder="필요한 내용을 입력해주세요."
            onChange={props.onChangeSearchInput}
          />
        </S.ListHeader>
        <S.Table>
          <Row style={S.row}>
            <Col style={S.tdCss} span={2}>
              <S.Label isHeader={true}>번호</S.Label>
            </Col>
            <Col style={S.tdCss} span={10}>
              <S.Label isHeader={true}>상품명</S.Label>
            </Col>
            <Col style={S.tdCss} span={4}>
              <S.Label isHeader={true}>판매상태</S.Label>
            </Col>
            <Col style={S.tdCss} span={4}>
              <S.Label isHeader={true}>가격</S.Label>
            </Col>
            <Col style={S.tdCss} span={4}>
              <S.Label isHeader={true}>날짜</S.Label>
            </Col>
          </Row>
          {data?.map((el, index) => (
            <Row key={el._id} style={S.row}>
              <Col style={S.tdCss} span={2}>
                <S.Label>{index}</S.Label>
              </Col>
              <Col style={S.tdCss} span={10}>
                <S.Label>{el.name}</S.Label>
              </Col>
              <Col style={S.tdCss} span={4}>
                <S.Label>{el.soldAt ? "판매완료" : ""}</S.Label>
              </Col>
              <Col style={S.tdCss} span={4}>
                <S.Label>{el.price}</S.Label>
              </Col>
              <Col style={S.tdCss} span={4}>
                <S.Label>{getDate(el.updatedAt)}</S.Label>
              </Col>
            </Row>
          ))}
        </S.Table>
      </S.MyListWrap>
    </S.Wrap>
  );
}

export default MyPagePresenter;
