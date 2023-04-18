/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardListPresenterPage from "./BoardList.presenter";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useQuery } from "@apollo/client";
import router from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import _ from "lodash";

import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../commons/types/generated/types";
import Pagination from "../../pagination/Pagination.container";

export default function BoardListContainerPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());
  const minDate = startDate;
  const maxDate = endDate;

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: fetchBoardsCount, refetch: refetchCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const onClickBoardWrite = () => {
    router.push("/boards/new");
  };

  const onClickBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/detail/${event.currentTarget.id}`);
  };

  const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const debouncing = _.debounce((searchKeyword, startDate, endDate) => {
    refetch({ page: 1, search: searchKeyword, startDate, endDate });
    refetchCount({ search: searchKeyword, startDate, endDate });
  }, 300);

  useEffect(() => {
    debouncing(searchKeyword, startDate, endDate);
  }, [searchKeyword, startDate, endDate]);
  console.log(fetchBoardsCount?.fetchBoardsCount);
  return (
    <>
      <BoardListPresenterPage
        data={data}
        onClickBoardWrite={onClickBoardWrite}
        onClickBoardDetail={onClickBoardDetail}
        onChangeSearchInput={onChangeSearchInput}
        searchKeyword={searchKeyword}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        minDate={minDate}
        maxDate={maxDate}
      />
      <Pagination
        refetch={refetch}
        count={fetchBoardsCount?.fetchBoardsCount}
      />
    </>
  );
}
