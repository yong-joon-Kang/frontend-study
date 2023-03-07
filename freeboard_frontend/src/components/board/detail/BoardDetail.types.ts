import { IQuery } from "../../../commons/types/generated/types";

export interface IBoardDetailPresenterPageProps {
  data?: Pick<IQuery, "fetchBoard">;
  onClickBoardList: () => void;
  onClickBoardDelete: () => void;
  onClickBoardEdit: () => void;
}
