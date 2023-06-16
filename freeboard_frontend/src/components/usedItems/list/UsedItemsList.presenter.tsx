import * as S from "./UsedItemsList.styles";
import { IBoardListPresenterPageProps } from "./UsedItemsList.types";
import "react-datepicker/dist/react-datepicker.css";
import OneRowContainer from "./oneRow/OneRow.container";
import InfiniteScroll from "react-infinite-scroller";
import TodayItems from "./todayItems";
import Select from "react-select";
import SearchInput from "../../commons/searchInput/SearchInput";

export default function BoardListPresenterPage(
  props: IBoardListPresenterPageProps
) {
  console.log(props.data?.fetchUseditems);
  return (
    <S.Wrapper>
      <S.ListWrapper>
        <S.ListHeader>
          <Select
            defaultValue={props.selectedOption}
            onChange={props.setSelectedOption}
            options={props.options}
          />
          <S.SearchWrap>
            <SearchInput
              onChange={props.onChangeSearchInput}
              placeholder="제품을 검색해주세요."
            />
          </S.SearchWrap>
          <S.WriteBtn onClick={props.onClickMoveToPage("/usedItems/new")}>
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
                  <OneRowContainer
                    list={list}
                    searchKeyword={props.searchKeyword}
                  />
                </div>
              )
            )}
          </InfiniteScroll>
        </S.List>
        {props.todayItems.length > 0 && (
          <TodayItems todayItems={props.todayItems} />
        )}
      </S.ListWrapper>
    </S.Wrapper>
  );
}
