import BoardDetail from "../../../../src/components/board/detail/BoardDetail.container";
import BoardCommentWrite from "../../../../src/components/boardComment/write/BoardCommentWrite.container";
import BoardCommentList from "../../../../src/components/boardComment/list/BoardCommentList.container";
import styled from "@emotion/styled";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function detailPage() {
  return (
    <Wrap>
      <BoardDetail />
      <BoardCommentWrite
        isEdit={false}
        id={""}
        writer={undefined}
        contents={""}
        rating={0}
      />
      <BoardCommentList />
    </Wrap>
  );
}
