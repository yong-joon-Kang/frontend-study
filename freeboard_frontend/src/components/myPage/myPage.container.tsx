import { useQuery } from "@apollo/client";
import MyPagePresenter from "./myPage.presenter";
import {
  FETCH_USEDITEMS_COUNT_IPICKED,
  FETCH_USEDITEMS_COUNT_ISOLD,
  FETCH_USEDITEMS_IPICKED,
  FETCH_USEDITEMS_ISOLD,
} from "./myPage.queries";
import {
  IQuery,
  IQueryFetchUseditemsIPickedArgs,
  IQueryFetchUseditemsISoldArgs,
} from "../../commons/types/generated/types";
import { ChangeEvent, useState } from "react";
import Pagination from "../pagination/Pagination.container";
import _ from "lodash";

function MyPageContainer() {
  const [resultData, setResultData]: any = useState();
  const [clickedTab, setClickedTab] = useState("fetchUseditemsISold");

  const { data: myUseditemsData, refetch: refetchUsedItems } = useQuery<
    Pick<IQuery, "fetchUseditemsISold">,
    IQueryFetchUseditemsISoldArgs
  >(FETCH_USEDITEMS_ISOLD);

  const { data: myUseditemsCount } = useQuery<
    Pick<IQuery, "fetchUseditemsCountISold">
  >(FETCH_USEDITEMS_COUNT_ISOLD);

  const { data: myPickedData, refetch: refetchIPicked } = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_USEDITEMS_IPICKED, {
    variables: {
      page: 1,
      search: "",
    },
  });

  const { data: myPickedCount } = useQuery<
    Pick<IQuery, "fetchUseditemsCountIPicked">
  >(FETCH_USEDITEMS_COUNT_IPICKED);

  const onClickMyUseditems = () => {
    setResultData(myUseditemsData);
    setClickedTab("fetchUseditemsISold");
  };

  const onClickMyPick = () => {
    setResultData(myPickedData);
    setClickedTab("fetchUseditemsIPicked");
  };

  const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  const getDebounce = _.debounce((searchKeyword) => {
    // setSearchKeyword(searchKeyword);
    refetchUsedItems({ page: 1, search: searchKeyword });
  }, 300);

  return (
    <>
      <MyPagePresenter
        data={resultData ?? myUseditemsData}
        onClickMyUseditems={onClickMyUseditems}
        onClickMyPick={onClickMyPick}
        clickedTab={clickedTab}
        onChangeSearchInput={onChangeSearchInput}
      />
      {clickedTab === "fetchUseditemsISold" ? (
        <Pagination
          refetch={refetchUsedItems}
          count={myUseditemsCount?.fetchUseditemsCountISold}
        />
      ) : (
        <Pagination
          refetch={refetchIPicked}
          count={myPickedCount?.fetchUseditemsCountIPicked}
        />
      )}
    </>
  );
}

export default MyPageContainer;
