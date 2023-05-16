import UsedItemsCommentWriteContainerPage from "../write/UsedItemsCommentWrite.container";
import * as S from "./UsedItemsCommentList.styles";
import { UsedItemsCommentListPresenterPageProps } from "./UsedItemsCommentList.types";
import UsedItemsCommentOneRow from "./usedItemsCommentOneRow/UsedItemsCommentOneRow";
import InfiniteScroll from "react-infinite-scroller";

export default function BoardCommentListPresenterPage(
  props: UsedItemsCommentListPresenterPageProps
) {
  const resultObj =
    props.data?.fetchUseditemQuestions ??
    props.data?.fetchUseditemQuestionAnswers;

  return (
    <S.Wrapper isAnswer={props.isAnswer}>
      <S.CommentListWrap>
        <InfiniteScroll
          pageStart={0}
          loadMore={props.onLoadMore}
          hasMore={props.hasMore}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {resultObj?.map((el, index: number) =>
            props.isEditArr[index] ? (
              // 댓글 수정 컴포넌트
              <UsedItemsCommentWriteContainerPage
                key={el._id}
                isEdit={true}
                id={el._id}
                contents={el.contents}
                index={index}
                isEditArr={props.isEditArr}
                setIsEditArr={props.setIsEditArr}
                isAnswer={props.isAnswer}
                useditemQuestionId={props.useditemQuestionId}
              />
            ) : (
              // 댓글 리스트 중 하나의 댓글
              <UsedItemsCommentOneRow
                key={el._id}
                el={el}
                index={index}
                onClickUpdate={props.onClickUpdate}
                onToggleModal={props.onToggleModal}
                isAnswer={props.isAnswer}
              />
            )
          )}
        </InfiniteScroll>
      </S.CommentListWrap>
    </S.Wrapper>
  );
}
