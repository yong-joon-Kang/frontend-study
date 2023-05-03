import { useEffect, useState } from "react";
import * as S from "./TodayItems.styles";
import { useRouter } from "next/router";
import { getComma } from "../../../../commons/libraries/utils";

function index() {
  const router = useRouter();
  const [todayItems, setTodayItems] = useState([]);
  useEffect(() => {
    const storage = localStorage.getItem("todayItems");
    if (storage)
      setTodayItems(
        JSON.parse(localStorage.getItem("todayItems") ?? "").reverse()
      );
  }, []);

  const onClickItem = (id: string) => {
    console.log(id);
    router.push(`/usedItems/detail/${id}`);
  };

  return (
    <S.Wrap>
      <S.Title>오늘 본 상품</S.Title>
      {todayItems.map((el: any) => (
        <>
          <S.ItemWrap
            onClick={() => {
              onClickItem(el._id);
            }}
          >
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
            <S.Price>{getComma(el.price)}원</S.Price>
            <S.PartTags>{el.tags}</S.PartTags>
          </S.ItemWrap>
        </>
      ))}
    </S.Wrap>
  );
}

export default index;
