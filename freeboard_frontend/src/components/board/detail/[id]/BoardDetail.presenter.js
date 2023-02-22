import * as S from "./BoardDetail.styles"
import { getDate } from "../../../../commons/libraries/utils"

export default function BoardDetailPresenterPage(props){

    return(
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.HeadLeft>
                        <S.ProfileImg src="/profileDef.png"></S.ProfileImg>
                        <S.ProfileDetailWrap>
                            <S.ProfileName>{props.data?.fetchBoard.writer}</S.ProfileName>
                            <S.ProfileDate>{getDate(props.data?.fetchBoard.updatedAt)}</S.ProfileDate>
                        </S.ProfileDetailWrap>
                    </S.HeadLeft>
                    <S.HeadRight>
                        <S.LinkImg src="/link.png"></S.LinkImg>
                        <S.LocationImg src="/location.png"></S.LocationImg>
                    </S.HeadRight>
                </S.Header>
                <S.Contents>
                    <S.Title>{props.data?.fetchBoard.title}</S.Title>
                    {props.data?.fetchBoard.contents}
                </S.Contents>
                <S.Footer>

                </S.Footer>
            </S.CardWrapper>
            <S.ButtonWrapper>
                <S.Button onClick={props.onClickBoardList}>목록으로</S.Button>
                <S.Button>수정하기</S.Button>
                <S.Button onClick={props.onClickBoardDelete}>삭제하기</S.Button>
            </S.ButtonWrapper>
        </S.Wrapper>
    )
}