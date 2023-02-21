import * as S from "./BoardDetail.styles"

export default function BoardDetailPresenterPage(props){

    return(
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.HeadLeft>
                        <S.ProfileImg src="/profileDef.png"></S.ProfileImg>
                        <S.ProfileDetailWrap>
                            <S.ProfileName>{props.data?.fetchBoard.writer}</S.ProfileName>
                            <S.ProfileDate>{props.data?.fetchBoard.updatedAt}</S.ProfileDate>
                        </S.ProfileDetailWrap>
                    </S.HeadLeft>
                    <S.HeadRight>
                        <S.LinkImg src="/link.png"></S.LinkImg>
                        <S.LocationImg src="/location.png"></S.LocationImg>
                    </S.HeadRight>
                </S.Header>
                <S.Contents>
                    게시글 제목입니다.
                </S.Contents>
                <S.Footer>

                </S.Footer>
            </S.CardWrapper>
            <S.ButtonWrapper>
                <S.Button>목록으로</S.Button>
                <S.Button>수정하기</S.Button>
                <S.Button>삭제하기</S.Button>
            </S.ButtonWrapper>
        </S.Wrapper>
    )
}