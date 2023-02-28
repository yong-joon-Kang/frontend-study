import BoardDetailPresenterPage from "./BoardDetail.presenter"
import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries"
import { useQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import BoardCommentsPage from "@/pages/boards/detail/[id]/comments"

export default function BoardDetailContainerPage(props){
    const router = useRouter()

    const {data} = useQuery(FETCH_BOARD, {
        variables: {
            boardId: router.query.id
        }
    })
    
    //console.log(data&&data)

    const onClickBoardList = () => {
        router.push("/boards/list")
    }
    
    const [deleteBoard] = useMutation(DELETE_BOARD)
    const onClickBoardDelete = async() => {
        if(window.confirm("정말로 삭제하시겠습니까?")){
            await deleteBoard({
                variables: {
                    boardId: props.router.query.id
                }
            })
    
            alert("게시글이 정상적으로 삭제되었습니다.")
    
            router.push("/boards/list")
        }
        
    }

    const onClickBoardEdit = () => {
        router.push(`/boards/detail/${props.router.query.id}/edit`)
    }

    return(
        <>
        <BoardDetailPresenterPage
            data={data}
            onClickBoardList={onClickBoardList}
            onClickBoardDelete={onClickBoardDelete}
            onClickBoardEdit={onClickBoardEdit}
        />
        <BoardCommentsPage />
        </>
    )
}