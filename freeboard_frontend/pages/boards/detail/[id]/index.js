import {
Wrapper,
CardWrapper,
Header,
HeadRight,
ProfileImg,
ProfileDetailWrap,
ProfileName,
ProfileDate,
LinkImg,
LocationImg,
HeadLeft,
Contents,
Footer,
ButtonWrapper,
Button,
} from "../../../../styles/detailBoardEmotion"
import { useRouter } from "next/router"
import { gql, useQuery } from "@apollo/client"



const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId){
        writer
        title
        contents
        createdAt
        updatedAt
        }
    }
`


export default function detailPage(){
    const router = useRouter()

    const {data} = useQuery(FETCH_BOARD, {
        variables: {
            boardId: router.query.id
        }
    })
    
    console.log(data&&data)
    
    return(
        <Wrapper>
            <CardWrapper>
                <Header>
                    <HeadLeft>
                        <ProfileImg src="/profileDef.png"></ProfileImg>
                        <ProfileDetailWrap>
                            <ProfileName>{data&&data.fetchBoard.writer}</ProfileName>
                            <ProfileDate>{data&&data.fetchBoard.updatedAt}</ProfileDate>
                        </ProfileDetailWrap>
                    </HeadLeft>
                    <HeadRight>
                        <LinkImg src="/link.png"></LinkImg>
                        <LocationImg src="/location.png"></LocationImg>
                    </HeadRight>
                </Header>
                <Contents>
                    게시글 제목입니다.
                </Contents>
                <Footer>

                </Footer>
            </CardWrapper>
            <ButtonWrapper>
                <Button>목록으로</Button>
                <Button>수정하기</Button>
                <Button>삭제하기</Button>
            </ButtonWrapper>
        </Wrapper>
    )
}