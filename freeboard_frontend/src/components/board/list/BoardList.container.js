import BoardListPresenterPage from "./BoardList.presenter"
import { FETCH_BOARDS } from "./BoardList.queries"
import { useQuery } from "@apollo/client"
import router from "next/router"


export default function BoardListContainerPage(){
    const {data} = useQuery(FETCH_BOARDS)

    const onClickBoardWrite = () => {
        router.push("/boards/new")
    }

    const onClickBoardDetail = (id) => {
        router.push(`/boards/detail/${id}`)
    }

    return(
        <BoardListPresenterPage 
            data={data} 
            onClickBoardWrite={onClickBoardWrite}
            onClickBoardDetail={onClickBoardDetail}
        />
    )
}