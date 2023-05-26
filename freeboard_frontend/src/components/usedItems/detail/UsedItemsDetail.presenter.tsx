import * as S from "./UsedItemsDetail.styles";
import { getComma, getDate } from "../../../commons/libraries/utils";
import { IUsedItemsDetailPresenterPageProps } from "./UsedItemsDetail.types";
import { useRouter } from "next/router";
import DefaultButton from "../../commons/button/DefaultButton";
import LikeOutLineIcon from "../../commons/icon/LikeOutLineIcon";
import SlickSlide from "../../commons/slickSlide/SlickSlide";
import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";

export default function UseditemDetailPresenterPage(
  props: IUsedItemsDetailPresenterPageProps
) {
  const { onClickMoveToPage } = useMoveToPage();
  const fetchUseditem = props.data?.fetchUseditem;
  const router = useRouter();
  return (
    <S.Wrapper>
      <S.CardWrapper>
        <S.Header>
          <S.HeadLeft>
            <S.ProfileImg src="/profileDef.png"></S.ProfileImg>
            <S.ProfileDetailWrap>
              <S.ProfileName>{fetchUseditem?.seller?.name}</S.ProfileName>
              <S.ProfileDate>{getDate(fetchUseditem?.updatedAt)}</S.ProfileDate>
            </S.ProfileDetailWrap>
          </S.HeadLeft>
          <S.HeadRight>
            {/* <Tooltip title={`${fetchUseditem?.youtubeUrl ?? ""}`}>
              <S.LinkImg src="/link.png"></S.LinkImg>
            </Tooltip>
            <Tooltip
              title={`${fetchUseditem?.boardAddress?.address ?? ""} ${
                fetchUseditem?.boardAddress?.addressDetail ?? ""
              }`}
            >
              <S.LocationImg src="/location.png"></S.LocationImg>
            </Tooltip> */}
          </S.HeadRight>
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
          <SlickSlide images={fetchUseditem?.images ?? []} />
        </S.Contents>

        <S.Footer>
          <div>{fetchUseditem?.contents}</div>
          <S.Tags>{fetchUseditem?.tags?.map((el) => ` #${el}`)}</S.Tags>
        </S.Footer>
      </S.CardWrapper>
      <S.ButtonWrapper>
        <DefaultButton
          onClick={onClickMoveToPage("/usedItems/list")}
          text="목록으로"
        />
        {/* 권한에 따른 수정버튼 표출 */}
        {props.userName === fetchUseditem?.seller?.name ? (
          <DefaultButton onClick={props.onClickUsedItemsEdit} text="수정하기" />
        ) : (
          <>
            <DefaultButton
              onClick={() => {
                props.onClickInCart(fetchUseditem ?? "");
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
