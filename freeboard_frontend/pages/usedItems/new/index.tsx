import { IQuery } from "../../../src/commons/types/generated/types";
import UsedItemsWriteContainerPage from "../../../src/components/usedItems/write/UsedItemsWrite.container";

interface IProps {
  isEdit: boolean;
  fetchBoardDataList?: Pick<IQuery, "fetchBoard">;
}

export default function CreateBoardPage(props: IProps) {
  return (
    <UsedItemsWriteContainerPage
      isEdit={props.isEdit}
      fetchBoardDataList={props.fetchBoardDataList}
    />
  );
}
