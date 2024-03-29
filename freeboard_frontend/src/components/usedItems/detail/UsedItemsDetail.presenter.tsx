import * as S from "./UsedItemsDetail.styles";
import { getComma, getDate } from "../../../commons/libraries/utils";
import { IUsedItemsDetailPresenterPageProps } from "./UsedItemsDetail.types";
import DefaultButton from "../../commons/button/DefaultButton";
import LikeOutLineIcon from "../../commons/icon/LikeOutLineIcon";
import SlickSlide from "../../commons/slickSlide/SlickSlide";
import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";
import { MemoizedKakaoMap } from "../../commons/kakaoMap/KakaoMap";
import DOMPurify from "dompurify";
import { IUseditem } from "../../../commons/types/generated/types";

export default function UseditemDetailPresenterPage(
  props: IUsedItemsDetailPresenterPageProps
) {
  const { onClickMoveToPage } = useMoveToPage();
  const fetchUseditem = props.data?.fetchUseditem;
  const slickImages = fetchUseditem?.images?.filter(Boolean); // 공백인 요소 제거

  console.log("fetchUseditemfetchUseditemfetchUseditemfetchUseditem");
  console.log(fetchUseditem);

  // const createMarkup = () => {
  //   return { __html: fetchUseditem?.contents.replace(/\n/g, "<br>") };
  // };

  return (
    <S.Wrapper>
      <S.CardWrapper>
        <S.Header>
          <S.HeadLeft>
            <S.ProfileImg
              src={`https://storage.googleapis.com/${fetchUseditem?.seller?.picture}`}
            ></S.ProfileImg>
            <S.ProfileDetailWrap>
              <S.ProfileName>{fetchUseditem?.seller?.name}</S.ProfileName>
              <S.ProfileDate>{getDate(fetchUseditem?.updatedAt)}</S.ProfileDate>
            </S.ProfileDetailWrap>
          </S.HeadLeft>
        </S.Header>
        <S.Contents>
          <S.ContentHeader>
            <S.ContentsLeft>
              <S.Remarks>{fetchUseditem?.remarks}</S.Remarks>
              <S.Name>{fetchUseditem?.name}</S.Name>
              <S.Price>
                {getComma(String(fetchUseditem?.price) ?? "")}원
              </S.Price>
            </S.ContentsLeft>
            <S.ContentsRight>
              <S.LikeWrap isLikeIcon={true} onClick={props.onClickCountLike}>
                <LikeOutLineIcon />
                <S.LikeCnt>{fetchUseditem?.pickedCount}</S.LikeCnt>
              </S.LikeWrap>
            </S.ContentsRight>
          </S.ContentHeader>
          {<SlickSlide images={slickImages ?? []} />}
          <S.Content>
            {typeof window !== "undefined" && (
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(fetchUseditem?.contents ?? ""),
                }}
              ></span>
            )}
          </S.Content>
          <S.Tags>
            {fetchUseditem?.tags?.map((tag) => `#${tag}`).join(" ")}
          </S.Tags>
        </S.Contents>

        <S.Footer isBottomLine={!!fetchUseditem?.useditemAddress?.address}>
          {fetchUseditem?.useditemAddress?.address && (
            <MemoizedKakaoMap
              address={fetchUseditem?.useditemAddress?.address}
            />
          )}
        </S.Footer>
      </S.CardWrapper>
      <S.ButtonWrapper>
        <DefaultButton
          onClick={onClickMoveToPage("/usedItems/list")}
          text="목록으로"
        />
        {/* 권한에 따른 수정버튼 표출 */}
        {props.userName === fetchUseditem?.seller?.name ? (
          <>
            <DefaultButton
              onClick={props.onClickUsedItemsEdit}
              text="수정하기"
            />
            <DefaultButton
              onClick={props.onClickUsedItemsDelete}
              text="삭제하기"
            />
          </>
        ) : (
          <>
            <DefaultButton
              onClick={() => {
                props.onClickInCart(fetchUseditem as IUseditem);
              }}
              text="장바구니 담기"
            />
            <DefaultButton
              onClick={onClickMoveToPage("/usedItems/cart")}
              text="장바구니"
            />
          </>
        )}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
