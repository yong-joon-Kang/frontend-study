import * as S from "./BoardDetail.styles";
import { getDate } from "../../../commons/libraries/utils";
import { IBoardDetailPresenterPageProps } from "./BoardDetail.types";
import { Tooltip } from "antd";
import SlickSlide from "../../commons/slickSlide/SlickSlide";
import YouTube from "react-youtube";
export default function BoardDetailPresenterPage(
  props: IBoardDetailPresenterPageProps
) {
  const fetchBoard = props.data?.fetchBoard;
  let videoId;
  if (fetchBoard?.youtubeUrl) {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.+&)?v=|shorts\/)|youtu\.be\/)([^#&?]+)/;
    const match = fetchBoard?.youtubeUrl?.match(regExp);

    if (match?.[1]) {
      videoId = match[1];
    } else {
      videoId = null;
    }
  }
  console.log(videoId);

  // let youtubeUrl = fetchBoard?.youtubeUrl;
  // if(youtubeUrl?.includes("shorts")){

  // }
  // const youtubeUrl = fetchBoard?.youtubeUrl
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
          <S.Content>{fetchBoard?.contents}</S.Content>
          <SlickSlide images={fetchBoard?.images ?? []} />
          {videoId && (
            <YouTube
              style={{ margin: "200px auto 0 auto" }}
              videoId={videoId ?? ""} // defaults -> null
              opts={{
                width: "560",
                height: "315",
                playerVars: {
                  autoplay: 0, // 자동재생 O
                  rel: 0, // 관련 동영상 표시하지 않음
                  modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                },
              }}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          )}
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
