import BoardListPresenterPage from "./BoardList.presenter";
import { FETCH_BOARDS } from "./BoardList.queries";
import { useQuery } from "@apollo/client";
import router from "next/router";
import { MouseEvent } from "react";

import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../commons/types/generated/types";

export default function BoardListContainerPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const onClickBoardWrite = () => {
    router.push("/boards/new");
  };

  const onClickBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/detail/${event.currentTarget.id}`);
  };

  return (
    <BoardListPresenterPage
      data={data}
      onClickBoardWrite={onClickBoardWrite}
      onClickBoardDetail={onClickBoardDetail}
    />
  );
}
