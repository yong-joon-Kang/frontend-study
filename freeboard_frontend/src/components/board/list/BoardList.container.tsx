/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardListPresenterPage from "./BoardList.presenter";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import _ from "lodash";

import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../commons/types/generated/types";
import Pagination from "../../pagination/Pagination.container";
import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";

export default function BoardListContainerPage() {
  const { onClickMoveToPage } = useMoveToPage();
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

  const getDebounce = _.debounce((searchKeyword, startDate, endDate) => {
    setSearchKeyword(searchKeyword);
    setStartDate(startDate);
    setEndDate(endDate);
    refetch({ page: 1, search: searchKeyword, startDate, endDate });
    refetchCount({ search: searchKeyword, startDate, endDate });
  }, 300);

  const onChangeSearchKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value, startDate, endDate);
  };

  const onChangeStartDate = (date: Date) => {
    getDebounce(searchKeyword, date, endDate);
  };

  const onChangeEndDate = (date: Date) => {
    getDebounce(searchKeyword, startDate, date);
  };

  return (
    <>
      <BoardListPresenterPage
        data={data}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        minDate={minDate}
        maxDate={maxDate}
        searchKeyword={searchKeyword}
        onClickMoveToPage={onClickMoveToPage}
      />
      <Pagination
        refetch={refetch}
        count={fetchBoardsCount?.fetchBoardsCount}
      />
    </>
  );
}
