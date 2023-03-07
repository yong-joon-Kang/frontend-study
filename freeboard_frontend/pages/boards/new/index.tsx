import { IQuery } from "../../../src/commons/types/generated/types";
import BoardWriteContainerPage from "../../../src/components/board/write/BoardWrite.container";

interface IProps {
  isEdit: boolean;
  fetchBoardDataList?: Pick<IQuery, "fetchBoard">;
}

export default function CreateBoardPage(props: IProps) {
  return (
    <BoardWriteContainerPage
      isEdit={props.isEdit}
      fetchBoardDataList={props.fetchBoardDataList}
    />
  );
}
