/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardListPresenterPage from "./UsedItemsList.presenter";
import { FETCH_USED_ITEMS } from "./UsedItemsList.queries";
import { useQuery } from "@apollo/client";
import router from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { ContainerWrap } from "./UsedItemsList.styles";
import _ from "lodash";

import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../../commons/types/generated/types";
import TodayItems from "./todayItems";
import styled from "@emotion/styled";

const ListWrap = styled.div`
  position: relative;
`;

export default function BoardListContainerPage() {
  const [todayItems, setTodayItems] = useState([]);
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

  const onClickWrite = () => {
    router.push("/usedItems/new");
  };

  const onClickOneRow = (list: any) => {
    const Storage = JSON.parse(localStorage.getItem("todayItems") ?? "[]");
    const result = Storage.filter((el: any) => el._id === list._id);
    if (result.length > 0) router.push(`/usedItems/detail/${list._id}`);
    Storage.push(list);
    localStorage.setItem("todayItems", JSON.stringify(Storage));
    router.push(`/usedItems/detail/${list._id}`);
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

  useEffect(() => {
    setTodayItems(JSON.parse(localStorage.getItem("todayItems") ?? "[]"));
    console.log("List");
  }, []);
  return (
    <ListWrap>
      <BoardListPresenterPage
        data={data}
        onClickWrite={onClickWrite}
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
      {todayItems.length > 0 && <TodayItems />}
    </ListWrap>
  );
}
