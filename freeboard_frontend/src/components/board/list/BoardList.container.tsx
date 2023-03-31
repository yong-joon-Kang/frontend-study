/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardListPresenterPage from "./BoardList.presenter";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useQuery } from "@apollo/client";
import router from "next/router";
import { MouseEvent, useState } from "react";

import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../commons/types/generated/types";
import styled from "@emotion/styled";

export default function BoardListContainerPage() {
  const [startPage, setStartPage] = useState(1);

  const { data: fetchBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const lastPageNum = fetchBoardsCount
    ? Math.ceil(fetchBoardsCount.fetchBoardsCount / 10)
    : 0;

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickBoardWrite = () => {
    router.push("/boards/new");
  };

  const onClickBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/detail/${event.currentTarget.id}`);
  };

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrev = () => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
  };

  const onClickNext = () => {
    if (startPage + 10 <= lastPageNum) setStartPage((prev) => prev + 10);
  };

  const PageNum = styled.span`
    margin: 10px;
  `;

  return (
    <>
      <BoardListPresenterPage
        data={data}
        onClickBoardWrite={onClickBoardWrite}
        onClickBoardDetail={onClickBoardDetail}
      />
      <span onClick={onClickPrev}>이전</span>
      {new Array(10).fill(1).map(
        (el, index) =>
          index + startPage <= lastPageNum && (
            <PageNum
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
            >
              {index + startPage}
            </PageNum>
          )
      )}
      <span onClick={onClickNext}>다음</span>
    </>
  );
}
