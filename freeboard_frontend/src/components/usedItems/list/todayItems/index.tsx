import { useEffect, useState } from "react";
import * as S from "./TodayItems.styles";
import { getComma } from "../../../../commons/libraries/utils";
import LikeIcon from "../../../commons/icon/LikeIcon";
import { IUseditem } from "../../../../commons/types/generated/types";
import { useMoveToPage } from "../../../../commons/customHooks/useMoveToPage/useMoveToPage";
import { useApolloClient } from "@apollo/client";
import { FETCH_USED_ITEM } from "../../detail/UsedItemsDetail.queries";
import { useDeletedErrorMsg } from "../../../../commons/customHooks/useDeletedErrorMsg/useDeletedErrorMsg";

interface IProps {
  todayItems: string[];
}

function index(props: IProps) {
  const client = useApolloClient();
  const { onClickMoveToPage } = useMoveToPage();
  const { onClickDeleted } = useDeletedErrorMsg();

  const [todayItems, setTodayItems] = useState<IUseditem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const storageTodayItemsId = props.todayItems;
      const todayItems = [];

      for (const el of storageTodayItemsId) {
        try {
          const { data } = await client.query({
            query: FETCH_USED_ITEM,
            variables: {
              useditemId: el,
            },
          });
          if (data.fetchUseditem) todayItems.push(data.fetchUseditem);
          console.log(todayItems.length);
        } catch (error) {}
      }

      setTodayItems(todayItems);
    };

    fetchData();
  }, []);

  const onClickOneItem = async (id: string) => {
    const isErrorOccurred = await onClickDeleted(id);
    if (isErrorOccurred) return false;

    onClickMoveToPage(`/usedItems/detail/${id}`)();
  };

  return (
    <S.Wrap>
      <S.Title>최근 본 상품</S.Title>
      {todayItems.map((el: IUseditem) => (
        <>
          <S.ItemWrap
            onClick={() => {
              onClickOneItem(el._id);
            }}
          >
            <S.LikeWrap>
              <LikeIcon />
              &nbsp;
              {el.pickedCount}
            </S.LikeWrap>
            <S.ImgWrap>
              <S.Img
                src={`https://storage.googleapis.com/${
                  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                  el.images?.[0] || el.images?.[1] || el.images?.[2]
                }`}
                alt={el.images?.[0]}
              />
            </S.ImgWrap>
            <S.PartTitle>{el.name}</S.PartTitle>
            <S.PartContents>{el.contents}</S.PartContents>
            <S.Price>{getComma(String(el.price))}원</S.Price>
            <S.PartTags>{el.tags}</S.PartTags>
          </S.ItemWrap>
        </>
      ))}
    </S.Wrap>
  );
}

export default index;
