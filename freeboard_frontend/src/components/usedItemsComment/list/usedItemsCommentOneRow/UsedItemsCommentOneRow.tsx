import * as S from "../UsedItemsCommentList.styles";
import { getDate } from "../../../../commons/libraries/utils";
import { IProps } from "./UsedItemsCommentOneRow.types";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../commons/libraries/recoil";
import UsedItemsCommentWriteContainerPage from "../../write/UsedItemsCommentWrite.container";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_USEDITEM_QUESTION_ANSWERS } from "./usedItemsCommentOneRow.queries";
import {
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../../commons/types/generated/types";
import AnswerListPage from "../AnswerList";
import AnswerArrow from "../../../commons/icon/AnswerArrow";

function UsedItemsCommentOneRow(props: IProps) {
  // console.log(props.el);
  const [userInfo] = useRecoilState(userInfoState);
  const [isAnswer, setIsAnswer] = useState(false);

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USEDITEM_QUESTION_ANSWERS, {
    variables: {
      page: 1,
      useditemQuestionId: props.el._id ?? "",
    },
  });
  return (
    <S.CommentList isAnswer={props.isAnswer} key={props.el._id}>
      <S.CommentHeader>
        {props.isAnswer && <AnswerArrow />}
        <S.ProfileImg src="/profileDef.png" />
        <S.MiddleWrap>
          <S.Writer>{props.el.user?.name}</S.Writer>
          <S.Contents>{props.el.contents}</S.Contents>
          <S.Date>
            {!props.isAnswer && getDate(props.el.user?.updatedAt)}
          </S.Date>
        </S.MiddleWrap>
        <S.RightWrap>
          {props.el.user?._id === userInfo._id ? (
            <>
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
            </>
          ) : (
            <S.Img
              src="/qa.png"
              onClick={() => {
                setIsAnswer(!isAnswer);
              }}
            />
          )}
        </S.RightWrap>
      </S.CommentHeader>
      {/* Answer의 등록 컴포넌트 보여주기 */}
      {isAnswer && (
        <UsedItemsCommentWriteContainerPage
          isAnswer={true}
          setIsAnswer={setIsAnswer}
          useditemQuestionId={props.el._id ?? ""}
        />
      )}
      {/* 다시 접근했을 때는 바로 위의 user의 data를 조회해서 length가져와야함 useditemQuestionId는 answerList뿌리기위한 부모 id */}
      {data?.fetchUseditemQuestionAnswers &&
        data?.fetchUseditemQuestionAnswers.length > 0 && (
          <AnswerListPage
            isAnswer={true}
            useditemQuestionId={props.el._id ?? ""}
          />
        )}
    </S.CommentList>
  );
}

export default UsedItemsCommentOneRow;
