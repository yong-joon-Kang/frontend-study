import * as S from "./UsedItemsList.styles";
import { getDate } from "../../../commons/libraries/utils";
import { IBoardListPresenterPageProps } from "./UsedItemsList.types";
import "react-datepicker/dist/react-datepicker.css";
import OneRowContainer from "./oneRow/OneRow.container";
import InfiniteScroll from "react-infinite-scroller";

export default function BoardListPresenterPage(
  props: IBoardListPresenterPageProps
) {
  return (
    <S.Wrapper>
      <S.ListWrapper>
        <S.ListHeader>
          <S.SearchWrap>
            <S.SearchImg src="/search.png" />
            <S.SearchInput
              onChange={props.onChangeSearchInput}
              type="text"
              placeholder="제목을 검색해주세요."
            />
          </S.SearchWrap>
          <S.DateWrap>
            <S.DateInput
              onChange={(date) => props.setStartDate(date)}
              selected={props.startDate}
              maxDate={props.maxDate}
              dateFormat="yyyy-MM-dd"
            />
          </S.DateWrap>
          <S.DateWrap>
            <S.DateInput
              onChange={(date) => props.setEndDate(date)}
              selected={props.endDate}
              minDate={props.minDate}
              dateFormat="yyyy-MM-dd"
            />
          </S.DateWrap>
          <S.WriteBtn onClick={props.onClickWrite}>
            <S.WriteImg src="/pencil.png" />
            게시물 등록하기
          </S.WriteBtn>
        </S.ListHeader>
        <S.List>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={props.hasMore}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
            useWindow={false}
          >
            {(props.data?.fetchUseditems ?? []).map(
              (list: any, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    props.onClickOneRow(list);
                  }}
                >
                  <OneRowContainer list={list} />
                </div>
              )
            )}
          </InfiniteScroll>
        </S.List>
      </S.ListWrapper>
    </S.Wrapper>
  );
}
