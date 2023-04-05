import BoardCommentWriteContainerPage from "../write/BoardCommentWrite.container";
import * as S from "./BoardCommentList.styles";
import { IBoardCommentListPresenterPageProps } from "./BoardCommentList.types";
import BoardCommentOneRow from "./BoardCommentOneRow/BoardCommentOneRow";
import InfiniteScroll from "react-infinite-scroller";

export default function BoardCommentListPresenterPage(
  props: IBoardCommentListPresenterPageProps
) {
  return (
    <S.Wrapper>
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
          {props.data?.fetchBoardComments.map((el, index: number) =>
            props.isEditArr[index] ? (
              <BoardCommentWriteContainerPage
                key={el._id}
                isEdit={true}
                id={el._id}
                writer={el.writer}
                contents={el.contents}
                rating={el.rating}
              />
            ) : (
              <BoardCommentOneRow
                key={el._id}
                el={el}
                index={index}
                onClickUpdate={props.onClickUpdate}
                onToggleModal={props.onToggleModal}
              />
            )
          )}
        </InfiniteScroll>
      </S.CommentListWrap>
    </S.Wrapper>
  );
}
