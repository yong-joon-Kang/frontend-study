import * as S from "./BoardList.styles";
import { getDate } from "../../../commons/libraries/utils";
import { IBoardListPresenterPageProps } from "./BoardList.types";
import { v4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";

export default function BoardListPresenterPage(
  props: IBoardListPresenterPageProps
) {
  const uuid = v4();
  return (
    <S.Wrapper>
      <S.ListWrapper>
        <S.ListHeader>
          <S.SearchWrap>
            <S.SearchImg src="/search.png" />
            <S.SearchInput
              onChange={props.onChangeSearchKeyword}
              type="text"
              placeholder="제목을 검색해주세요."
            />
          </S.SearchWrap>
          <S.DateWrap>
            <S.DateInput
              onChange={(date) => {
                props.onChangeStartDate(date);
              }}
              selected={props.startDate}
              maxDate={props.maxDate}
              dateFormat="yyyy-MM-dd"
            />
          </S.DateWrap>
          <S.DateWrap>
            <S.DateInput
              onChange={(date) => {
                props.onChangeEndDate(date);
              }}
              selected={props.endDate}
              minDate={props.minDate}
              dateFormat="yyyy-MM-dd"
            />
          </S.DateWrap>
          <S.BoardWriteBtn onClick={props.onClickMoveToPage("/boards/new")}>
            <S.WriteImg src="/pencil.png" />
            게시물 등록하기
          </S.BoardWriteBtn>
        </S.ListHeader>
        <S.List>
          <S.Table>
            <thead>
              <S.Tr hvBgColor="none" pointer="auto">
                <S.Th>번호</S.Th>
                <S.Th width="60%">제목</S.Th>
                <S.Th width="20%">작성자</S.Th>
                <S.Th>날짜</S.Th>
              </S.Tr>
            </thead>
            <tbody>
              {props.data?.fetchBoards.map((list: any, index: number) => (
                <S.Tr
                  key={list._id}
                  onClick={props.onClickMoveToPage(
                    `/boards/detail/${list._id}`
                  )}
                >
                  <S.Td>{index + 1}</S.Td>
                  <S.Td>
                    {list.title
                      .replaceAll(
                        props.searchKeyword,
                        `${uuid}${props.searchKeyword}${uuid}`
                      )
                      .split(uuid)
                      .map((el: string, index: number) => (
                        <S.Title
                          key={index}
                          keyword={el === props.searchKeyword}
                        >
                          {el}
                        </S.Title>
                      ))}
                  </S.Td>
                  <S.Td>{list.writer}</S.Td>
                  <S.Td>{getDate(list.createdAt)}</S.Td>
                </S.Tr>
              ))}
            </tbody>
          </S.Table>
        </S.List>
      </S.ListWrapper>
    </S.Wrapper>
  );
}
