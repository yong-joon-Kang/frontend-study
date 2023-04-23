/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardListPresenterPage from "./UsedItemsList.presenter";
import { FETCH_USED_ITEMS } from "./UsedItemsList.queries";
import { useQuery } from "@apollo/client";
import router from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import _ from "lodash";

import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../../commons/types/generated/types";

export default function BoardListContainerPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());
  const minDate = startDate;
  const maxDate = endDate;

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS, {
    variables: {
      page: 1,
    },
  });

  const onClickBoardWrite = () => {
    router.push("/boards/new");
  };

  const onClickOneRow = (id: string) => {
    router.push(`/usedItems/detail/${id}`);
  };

  const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const debouncing = _.debounce((searchKeyword) => {
    refetch({ page: 1, search: searchKeyword });
  }, 300);

  useEffect(() => {
    debouncing(searchKeyword);
  }, [searchKeyword]);
  return (
    <>
      <BoardListPresenterPage
        data={data}
        onClickBoardWrite={onClickBoardWrite}
        onClickOneRow={onClickOneRow}
        onChangeSearchInput={onChangeSearchInput}
        searchKeyword={searchKeyword}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        minDate={minDate}
        maxDate={maxDate}
      />
    </>
  );
}
