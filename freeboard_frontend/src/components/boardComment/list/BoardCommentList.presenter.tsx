import { getDate } from "../../../commons/libraries/utils";
import * as S from "./BoardCommentList.styles";
import { IBoardCommentListPresenterPageProps } from "./BoardCommentList.types";

export default function BoardCommentListPresenterPage(
  props: IBoardCommentListPresenterPageProps
) {
  return (
    <S.Wrapper>
      <S.CommentListWrap>
        {props.data?.fetchBoardComments.map((list: any, index: number) => (
          <S.CommentList key={index}>
            <S.CommentHeader>
              <S.ProfileImg src="/profileDef.png" />
              <S.MiddleWrap>
                <S.Writer>{list.writer}</S.Writer>
                <S.Contents>{list.contents}</S.Contents>
                <S.Date>{getDate(list.updatedAt)}</S.Date>
              </S.MiddleWrap>
              <S.RightWrap>
                <S.UpdateBtn
                  onClick={props.onClickUpdate}
                  src="/pencil-gray.png"
                ></S.UpdateBtn>
                <S.DeleteBtn
                  id={list._id}
                  onClick={props.onClickDelete}
                  src="/cancel.png"
                ></S.DeleteBtn>
              </S.RightWrap>
            </S.CommentHeader>
          </S.CommentList>
        ))}
      </S.CommentListWrap>
    </S.Wrapper>
  );
}
