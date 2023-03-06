import BoardWriteContainerPage from "../../../src/components/board/write/BoardWrite.container";

export default function CreateBoardPage(props: {
  isEdit: boolean;
  fetchBoardDataList?: any;
}) {
  return (
    <BoardWriteContainerPage
      isEdit={props.isEdit}
      fetchBoardDataList={props.fetchBoardDataList}
    />
  );
}
