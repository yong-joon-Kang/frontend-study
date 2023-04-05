import * as S from "../BoardCommentList.styles";
import { getDate } from "../../../../commons/libraries/utils";
import { ICommentList } from "./BoardCommentOneRow.types";

function BoardCommentOneRow(props: ICommentList) {
  return (
    <S.CommentList key={props.el._id}>
      <S.CommentHeader>
        <S.ProfileImg src="/profileDef.png" />
        <S.MiddleWrap>
          <S.Writer>
            {props.el.writer}
            <S.StarRate disabled value={props.el.rating} />
          </S.Writer>
          <S.Contents>{props.el.contents}</S.Contents>
          <S.Date>{getDate(props.el.updatedAt)}</S.Date>
        </S.MiddleWrap>
        <S.RightWrap>
          <S.UpdateBtn
            id={String(props.index)}
            onClick={props.onClickUpdate}
            src="/pencil-gray.png"
          ></S.UpdateBtn>
          <S.DeleteBtn
            id={props.el._id}
            onClick={props.onToggleModal}
            src="/cancel.png"
          ></S.DeleteBtn>
        </S.RightWrap>
      </S.CommentHeader>
    </S.CommentList>
  );
}

export default BoardCommentOneRow;
