import * as S from "./BoardDetail.styles";
import { getDate } from "../../../commons/libraries/utils";
import { IBoardDetailPresenterPageProps } from "./BoardDetail.types";
import { Tooltip } from "antd";
export default function BoardDetailPresenterPage(
  props: IBoardDetailPresenterPageProps
) {
  const fetchBoard = props.data?.fetchBoard;
  return (
    <S.Wrapper>
      <S.CardWrapper>
        <S.Header>
          <S.HeadLeft>
            <S.ProfileImg src="/profileDef.png"></S.ProfileImg>
            <S.ProfileDetailWrap>
              <S.ProfileName>{fetchBoard?.writer}</S.ProfileName>
              <S.ProfileDate>{getDate(fetchBoard?.updatedAt)}</S.ProfileDate>
            </S.ProfileDetailWrap>
          </S.HeadLeft>
          <S.HeadRight>
            <Tooltip title={`${fetchBoard?.youtubeUrl ?? ""}`}>
              <S.LinkImg src="/link.png"></S.LinkImg>
            </Tooltip>
            <Tooltip
              title={`${fetchBoard?.boardAddress?.address ?? ""} ${
                fetchBoard?.boardAddress?.addressDetail ?? ""
              }`}
            >
              <S.LocationImg src="/location.png"></S.LocationImg>
            </Tooltip>
          </S.HeadRight>
        </S.Header>
        <S.Contents>
          <S.Title>{fetchBoard?.title}</S.Title>
          {fetchBoard?.contents}
          {fetchBoard?.images?.map((el, index) => (
            <S.UploadImg
              key={index}
              src={`https://storage.googleapis.com/${el}`}
            ></S.UploadImg>
          ))}
        </S.Contents>
        <S.Footer>
          <S.LikeWrap isLikeIcon={true} onClick={props.onClickCountLike}>
            <S.LikeIcon />
            <S.LikeCnt>{fetchBoard?.likeCount}</S.LikeCnt>
          </S.LikeWrap>
          <S.LikeWrap isLikeIcon={false} onClick={props.onClickCountDislike}>
            <S.DislikeIcon />
            <S.LikeCnt>{fetchBoard?.dislikeCount}</S.LikeCnt>
          </S.LikeWrap>
        </S.Footer>
      </S.CardWrapper>
      <S.ButtonWrapper>
        <S.Button onClick={props.onClickMoveToPage("/boards/list")}>
          목록으로
        </S.Button>
        <S.Button
          onClick={props.onClickMoveToPage(
            `/boards/detail/${String(props.router.query.id)}/edit`
          )}
        >
          수정하기
        </S.Button>
        <S.Button onClick={props.onToggleModal}>삭제하기</S.Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}
