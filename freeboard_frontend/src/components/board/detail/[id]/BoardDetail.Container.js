import BoardWritePresenterPage from "./BoardDetail.presenter"
import { FETCH_BOARD } from "./BoardDetail.queries"
import { useQuery } from "@apollo/client"


export default function BoardDetailContainerPage(props){

    const {data} = useQuery(FETCH_BOARD, {
        variables: {
            boardId: props.router.query.id
        }
    })
    
    console.log(data&&data)

    return(
        <BoardWritePresenterPage data={data} />
    )
}