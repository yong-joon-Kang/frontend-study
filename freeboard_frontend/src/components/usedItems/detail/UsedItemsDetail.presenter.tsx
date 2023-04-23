import * as S from "./UsedItemsDetail.styles";
import { getDate } from "../../../commons/libraries/utils";
import { IUsedItemsDetailPresenterPageProps } from "./UsedItemsDetail.types";
import { Tooltip } from "antd";
import { useRouter } from "next/router";
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
            <S.LikeIcon />
            <S.LikeCnt>{fetchUseditem?.likeCount}</S.LikeCnt>
          </S.LikeWrap>
          <S.LikeWrap isLikeIcon={false} onClick={props.onClickCountDislike}>
            <S.DislikeIcon />
            <S.LikeCnt>{fetchUseditem?.dislikeCount}</S.LikeCnt>
          </S.LikeWrap>
        </S.Footer>
      </S.CardWrapper>
      <S.ButtonWrapper>
        <S.Button onClick={props.onClickUsedItemsList}>목록으로</S.Button>
        <S.Button onClick={props.onClickInCart(props.data?.fetchUseditem)}>
          장바구니 담기
        </S.Button>
        <S.Button
          onClick={() => {
            router.push("/usedItems/cart");
          }}
        >
          장바구니
        </S.Button>
        {/* <S.Button onClick={props.onClickUsedItemsEdit}>수정하기</S.Button>
        <S.Button onClick={props.onToggleModal}>삭제하기</S.Button> */}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
