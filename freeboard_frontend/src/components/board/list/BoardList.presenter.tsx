import * as S from "./BoardList.styles";
import { getDate } from "../../../commons/libraries/utils";

interface IProps {
  data: any;
  onClickBoardDetail: (arg0: string) => void;
  onClickBoardWrite: () => void;
}

export default function BoardListPresenterPage(props: IProps) {
  return (
    <S.Wrapper>
      <S.ListWrapper>
        <S.ListHeader>
          <S.SearchWrap>
            <S.SearchImg src="/search.png" />
            <S.SearchInput type="text" placeholder="제목을 검색해주세요." />
          </S.SearchWrap>
          <S.DateInput type="text" placeholder="YYYY.MM.DD ~ YYYY.MM.DD" />
          <S.SearchBtn>검색하기</S.SearchBtn>
        </S.ListHeader>
        <S.List>
          <S.Table>
            <thead>
              <S.Tr hvBgColor="none" pointer="auto">
                <S.Th>번호</S.Th>
                <S.Th width="70%">제목</S.Th>
                <S.Th>작성자</S.Th>
                <S.Th>날짜</S.Th>
              </S.Tr>
            </thead>
            <tbody>
              {props.data?.fetchBoards.map((list: any, index: number) => (
                <S.Tr
                  key={list._id}
                  onClick={() => props.onClickBoardDetail(list._id)}
                >
                  <S.Td>{index + 1}</S.Td>
                  <S.Td>{list.title}</S.Td>
                  <S.Td>{list.writer}</S.Td>
                  <S.Td>{getDate(list.createdAt)}</S.Td>
                </S.Tr>
              ))}
            </tbody>
          </S.Table>
        </S.List>
        <S.ListFooter>
          <S.PageNumber></S.PageNumber>
          <S.BoardWriteBtn onClick={props.onClickBoardWrite}>
            <S.WriteImg src="/pencil.png" />
            게시물 등록하기
          </S.BoardWriteBtn>
        </S.ListFooter>
      </S.ListWrapper>
    </S.Wrapper>
  );
}
