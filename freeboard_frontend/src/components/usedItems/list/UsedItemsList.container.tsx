/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardListPresenterPage from "./UsedItemsList.presenter";
import { FETCH_USED_ITEMS } from "./UsedItemsList.queries";
import { useQuery } from "@apollo/client";
import router from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import _ from "lodash";

import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../../commons/types/generated/types";
import styled from "@emotion/styled";
import BestItems from "./bestItems/BestItems";

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
  const [hasMore, setHasMore] = useState(true);

  const { data, refetch, fetchMore } = useQuery<
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
    if (result.length > 0) {
      router.push(`/usedItems/detail/${list._id}`);
      return;
    }
    Storage.push(list);
    localStorage.setItem("todayItems", JSON.stringify(Storage));
    router.push(`/usedItems/detail/${list._id}`);
  };

  const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  const getDebounce = _.debounce((searchKeyword) => {
    setSearchKeyword(searchKeyword);
    refetch({ page: 1, search: searchKeyword });
  }, 300);

  // 스크롤하여 더 많은 리스트 보기 원할 때 발생되는 이벤트
  const onLoadMore = () => {
    if (data?.fetchUseditems)
      fetchMore({
        variables: {
          page: Math.ceil(Number(data?.fetchUseditems.length) / 10 ?? 0) + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log(fetchMoreResult.fetchUseditems);
          if (fetchMoreResult.fetchUseditems.length === 0) {
            setHasMore(false);
            return {
              fetchUseditems: [...prev.fetchUseditems],
            };
          }

          return {
            fetchUseditems: [
              ...prev.fetchUseditems,
              ...fetchMoreResult.fetchUseditems,
            ],
          };
        },
      });
  };

  const options = [
    { value: false, label: "판매중상품" },
    { value: true, label: "판매된상품" },
  ];

  const [selectedOption, setSelectedOption] = useState({
    value: false,
    label: "판매중상품",
  });

  useEffect(() => {
    refetch({
      page: 1,
      search: searchKeyword,
      isSoldout: selectedOption.value,
    });
  }, [selectedOption]);

  useEffect(() => {
    setTodayItems(JSON.parse(localStorage.getItem("todayItems") ?? "[]"));
  }, []);
  return (
    <ListWrap>
      <BestItems />
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
        onLoadMore={onLoadMore}
        hasMore={hasMore}
        todayItems={todayItems}
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </ListWrap>
  );
}
