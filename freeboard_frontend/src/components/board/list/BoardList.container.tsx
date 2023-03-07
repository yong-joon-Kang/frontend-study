import BoardListPresenterPage from "./BoardList.presenter";
import { FETCH_BOARDS } from "./BoardList.queries";
import { useQuery } from "@apollo/client";
import router from "next/router";
import { IQuery } from "../../../commons/types/generated/types";

export default function BoardListContainerPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">>(FETCH_BOARDS);

  const onClickBoardWrite = () => {
    router.push("/boards/new");
  };

  const onClickBoardDetail = (id: string) => {
    router.push(`/boards/detail/${id}`);
  };

  return (
    <BoardListPresenterPage
      data={data}
      onClickBoardWrite={onClickBoardWrite}
      onClickBoardDetail={onClickBoardDetail}
    />
  );
}
