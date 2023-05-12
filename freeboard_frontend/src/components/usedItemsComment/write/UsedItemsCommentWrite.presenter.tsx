import * as S from "./UsedItemsCommentWrite.styles";
import { IUsedItemsCommentPresenterPageProps } from "./UsedItemsCommentWrite.types";

export default function BoardCommentPresenterPage(
  props: IUsedItemsCommentPresenterPageProps
) {
  // console.log("=========================");
  console.log(props.isAnswer);
  return (
    <S.Wrapper isAnswer={Boolean(props.isAnswer)}>
      <S.CommentWriteWrap isAnswer={props.isAnswer}>
        {!props.isEdit ? (
          !props.isAnswer && (
            <S.Header>
              <S.CommentImg src="/comments.png" />
              <span>문의하기</span>
            </S.Header>
          )
        ) : (
          <S.DeleteBtn
            onClick={() => {
              const isEditArr = [...(props.isEditArr ?? [])];
              isEditArr[Number(props.index)] = false;
              props.setIsEditArr(isEditArr);
            }}
            src="/cancel.png"
          ></S.DeleteBtn>
        )}
        {props.isAnswer && <S.AnswerArrow src="/answerArrow.png" />}
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
          <S.WriteBtn
            onClick={
              props.isAnswer ? props.onClickAnswerWrite : props.onClickCmtWrite
            }
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </S.WriteBtn>
        </S.TextAreaWrap>
      </S.CommentWriteWrap>
    </S.Wrapper>
  );
}
