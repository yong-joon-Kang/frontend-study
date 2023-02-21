import BoardDetailContainerPage from "../../../../src/components/board/detail/[id]/BoardDetail.Container"
import { useRouter } from "next/router"

export default function detailPage(){
    const router = useRouter()

    return(
        <BoardDetailContainerPage router={router} />
    )
}