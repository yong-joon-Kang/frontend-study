import UsedItemsDetail from "../../../../src/components/usedItems/detail/UsedItemsDetail.container";
// import UsedItemsCommentWrite from "../../../../src/components/usedItemsComment/write/UsedItemsCommentWrite.container";
// import UsedItemsCommentList from "../../../../src/components/usedItemsComment/list/UsedItemsCommentList.container";
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
      <UsedItemsDetail />
      {/* <UsedItemsCommentWrite
        isEdit={false}
        id={""}
        writer={undefined}
        contents={""}
        rating={0}
      /> */}
      {/* <UsedItemsCommentList /> */}
    </Wrap>
  );
}
