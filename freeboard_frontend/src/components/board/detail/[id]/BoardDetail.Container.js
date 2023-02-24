import BoardDetailPresenterPage from "./BoardDetail.presenter"
import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries"
import { useQuery, useMutation } from "@apollo/client"
import Router from "next/router"

export default function BoardDetailContainerPage(props){

    const {data} = useQuery(FETCH_BOARD, {
        variables: {
            boardId: props.router.query.id
        }
    })
    
    //console.log(data&&data)

    const onClickBoardList = () => {
        Router.push("/boards/list")
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
    
            Router.push("/boards/list")
        }
        
    }

    const onClickBoardEdit = () => {
        console.log('testes')
        Router.push(`/boards/detail/${props.router.query.id}/edit`)
    }

    return(
        <BoardDetailPresenterPage
            data={data}
            onClickBoardList={onClickBoardList}
            onClickBoardDelete={onClickBoardDelete}
            onClickBoardEdit={onClickBoardEdit}
        />
    )
}