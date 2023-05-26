import { useEffect, useState } from "react";
import * as S from "./TodayItems.styles";
import { getComma } from "../../../../commons/libraries/utils";
import LikeIcon from "../../../commons/icon/LikeIcon";
import { IUseditem } from "../../../../commons/types/generated/types";
import { useMoveToPage } from "../../../../commons/customHooks/useMoveToPage/useMoveToPage";

function index() {
  const { onClickMoveToPage } = useMoveToPage();
  const [todayItems, setTodayItems] = useState([]);
  useEffect(() => {
    const storage = localStorage.getItem("todayItems");
    if (storage)
      setTodayItems(
        JSON.parse(localStorage.getItem("todayItems") ?? "").reverse()
      );
  }, []);

  return (
    <S.Wrap>
      <S.Title>오늘 본 상품</S.Title>
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
