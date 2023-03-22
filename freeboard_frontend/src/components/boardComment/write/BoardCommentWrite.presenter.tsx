import * as S from "./BoardCommentWrite.styles";
import { IBoardCommentPresenterPageProps } from "./BoardCommentWrite.types";

export default function BoardCommentPresenterPage(
  props: IBoardCommentPresenterPageProps
) {
  return (
    <S.Wrapper>
      <S.CommentWriteWrap>
        <S.Header>
          <S.CommentImg src="/comments.png" />
          <span>댓글</span>
        </S.Header>
        <S.StarRate onChange={props.setRateCnt} defaultValue={5} />
        <S.WriterInput
          onChange={props.onChangeWriter}
          value={props.writer}
          placeholder="작성자"
        ></S.WriterInput>
        <S.WriterInput
          type="password"
          onChange={props.onChangePw}
          value={props.password}
          placeholder="비밀번호"
        ></S.WriterInput>
        <S.StarScore></S.StarScore>
        <S.TextAreaWrap>
          <S.TextArea
            onChange={props.onChangeTextArea}
            value={props.contents}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          ></S.TextArea>
          <S.ContentsLength>
            <S.CurrLength length={props.contentsLength}>
              {props.contentsLength ? props.contentsLength : "0"}
            </S.CurrLength>
            /<S.MaxLength>100</S.MaxLength>
          </S.ContentsLength>
          <S.WriteBtn onClick={props.onClickCmtWrite}>등록하기</S.WriteBtn>
        </S.TextAreaWrap>
      </S.CommentWriteWrap>
    </S.Wrapper>
  );
}
