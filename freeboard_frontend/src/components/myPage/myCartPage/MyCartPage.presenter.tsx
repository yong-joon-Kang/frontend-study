import { getDate } from "../../../commons/libraries/utils";
import * as S from "./MyCartPage.styles";
import { Col, Row } from "antd";

import SearchInput from "../../commons/searchInput/SearchInput";
import { IContainerProps } from "./MyCartPage.types";
import { IUseditem } from "../../../commons/types/generated/types";
// import LeftMenu from "../leftMenu/LeftMenu";

function MyCartPagePresenter(props: IContainerProps) {
  const data =
    props.data?.fetchUseditemsISold || props.data?.fetchUseditemsIPicked;
  // console.log(data);
  return (
    <S.Wrap>
      {/* <S.MyInfoWrap>
        <LeftMenu />
      </S.MyInfoWrap> */}
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
            searchInputRef={props.searchInputRef}
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
          {data?.map((el: IUseditem, index: number) => (
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

export default MyCartPagePresenter;
