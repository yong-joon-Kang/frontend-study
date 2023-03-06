import BoardDetail from "../../../../src/components/board/detail/BoardDetail.container";
import BoardCommentWrite from "../../../../src/components/boardComment/write/BoardCommentWrite.container";
import BoardCommentList from "../../../../src/components/boardComment/list/BoardCommentList.container";

export default function detailPage() {
  return (
    <>
      <BoardDetail />
      <BoardCommentWrite />
      <BoardCommentList />
    </>
  );
}
