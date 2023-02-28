import * as S from "./BoardComment.styles"

export default function BoardCommentPresenterPage(props){
    return(
        <S.Wrapper>
            <S.CommentImg />
            <span>댓글</span>
            <S.StarScore></S.StarScore>
            <S.TextAreaWrap>
                <S.TextArea onChange={props.onChangeTextArea} placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."></S.TextArea>
                <S.MaxLength>0/100</S.MaxLength>
                <S.WriteBtn onClick={props.onClickCmtWrite}>등록하기</S.WriteBtn>
            </S.TextAreaWrap>
            <S.CommentList>
                <S.CommentHeader>
                    <S.ProfileImg />
                    <S.MiddleWrap>
                        <span>{props.data?.fetchBoardComments[0].writer}</span>
                        <span>{props.data?.fetchBoardComments[0].contents}</span>
                    </S.MiddleWrap>
                    <S.RightWrap>

                    </S.RightWrap>
                </S.CommentHeader>
                <S.CommentDate></S.CommentDate>
            </S.CommentList>
        </S.Wrapper>
    )
}