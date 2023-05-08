import * as S from "./UsedItemsDetail.styles";
import { getDate } from "../../../commons/libraries/utils";
import { IUsedItemsDetailPresenterPageProps } from "./UsedItemsDetail.types";
import { Tooltip } from "antd";
import { useRouter } from "next/router";
import DefaultButton from "../../commons/button/DefaultButton";
import LikeIcon from "../../commons/icon/LikeIcon";
export default function UseditemDetailPresenterPage(
  props: IUsedItemsDetailPresenterPageProps
) {
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
            <Tooltip title={`${fetchUseditem?.youtubeUrl ?? ""}`}>
              <S.LinkImg src="/link.png"></S.LinkImg>
            </Tooltip>
            <Tooltip
              title={`${fetchUseditem?.boardAddress?.address ?? ""} ${
                fetchUseditem?.boardAddress?.addressDetail ?? ""
              }`}
            >
              <S.LocationImg src="/location.png"></S.LocationImg>
            </Tooltip>
          </S.HeadRight>
        </S.Header>
        <S.Contents>
          <S.Title>{fetchUseditem?.name}</S.Title>
          {fetchUseditem?.contents}
          {fetchUseditem?.images?.map((el, index) => (
            <S.UploadImg
              key={index}
              src={`https://storage.googleapis.com/${el}`}
            ></S.UploadImg>
          ))}
        </S.Contents>
        <S.Footer>
          <S.LikeWrap isLikeIcon={true} onClick={props.onClickCountLike}>
            <LikeIcon />
            <S.LikeCnt>{fetchUseditem?.pickedCount}</S.LikeCnt>
          </S.LikeWrap>
        </S.Footer>
      </S.CardWrapper>
      <S.ButtonWrapper>
        <DefaultButton onClick={props.onClickUsedItemsList} text="목록으로" />
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
              onClick={() => {
                router.push("/usedItems/cart");
              }}
              text="장바구니"
            />
          </>
        )}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
