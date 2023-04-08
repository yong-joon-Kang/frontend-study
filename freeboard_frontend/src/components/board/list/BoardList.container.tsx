/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardListPresenterPage from "./BoardList.presenter";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useQuery } from "@apollo/client";
import router from "next/router";
import { MouseEvent } from "react";
import { css } from "@emotion/react";

import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../commons/types/generated/types";
import Pagination from "../../pagination/Pagination.container";

export default function BoardListContainerPage() {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: fetchBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const onClickBoardWrite = () => {
    router.push("/boards/new");
  };

  const onClickBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/detail/${event.currentTarget.id}`);
  };

  return (
    <>
      <BoardListPresenterPage
        data={data}
        onClickBoardWrite={onClickBoardWrite}
        onClickBoardDetail={onClickBoardDetail}
      />
      <Pagination
        refetch={refetch}
        count={fetchBoardsCount?.fetchBoardsCount}
      />
    </>
  );
}
