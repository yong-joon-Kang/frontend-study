import { useEffect, useState } from "react";
import * as S from "./TodayItems.styles";

function index() {
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
      {todayItems.map((el: any) => (
        <>
          <S.ItemWrap>
            <S.LikeWrap>
              <S.LikeIcon />
              {el.pickedCount}
            </S.LikeWrap>
            <S.ImgWrap>
              <S.Img
                src={`https://storage.googleapis.com/${el.images[0]}`}
                alt={el.images}
              />
            </S.ImgWrap>
            <S.PartTitle>{el.name}</S.PartTitle>
            <S.PartContents>{el.contents}</S.PartContents>
            <S.Price>{el.price}원</S.Price>
            <S.PartTags>{el.tags}</S.PartTags>
          </S.ItemWrap>
        </>
      ))}
    </S.Wrap>
  );
}

export default index;
