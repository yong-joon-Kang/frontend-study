import { useEffect, useState } from "react";
import * as S from "./TodayItems.styles";
import { getComma } from "../../../../commons/libraries/utils";
import LikeIcon from "../../../commons/icon/LikeIcon";
import { IUseditem } from "../../../../commons/types/generated/types";
import { useMoveToPage } from "../../../../commons/customHooks/useMoveToPage/useMoveToPage";
import { useApolloClient } from "@apollo/client";
import { FETCH_USED_ITEM } from "../../detail/UsedItemsDetail.queries";

interface IProps {
  todayItems: string[];
}

function index(props: IProps) {
  const client = useApolloClient();

  const { onClickMoveToPage } = useMoveToPage();
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
        } catch (error) {
          console.log(error);
        }
      }

      console.log("todayItems:", todayItems);
      setTodayItems(todayItems);
    };

    fetchData();
  }, []);

  return (
    <S.Wrap>
      <S.Title>최근 본 상품</S.Title>
      {todayItems.map((el: IUseditem) => (
        <>
          <S.ItemWrap
            onClick={onClickMoveToPage(`/usedItems/detail/${el._id}`)}
          >
            <S.LikeWrap>
              <LikeIcon />
              &nbsp;
              {el.pickedCount}
            </S.LikeWrap>
            <S.ImgWrap>
              <S.Img
                src={`https://storage.googleapis.com/${el.images?.[0] ?? ""}`}
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
