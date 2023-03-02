import BoardCommentListPresenterPage from "./BoardCommentList.presenter";
import { useQuery } from "@apollo/client";
import { FETCH_BOARD_COMMENTS } from "./BoardCommentList.queries"
import { useRouter } from "next/router";
import { useState } from "react";

export default function BoardCommentListContainerPage(){

    const [isEdit, setIsEdit] = useState(false)

    const router = useRouter()
    const { data } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: {
            page: 1,
            boardId: router.query.id
        }
    })

    const onClickUpdate = () => {
        setIsEdit(true)
    }

    const onClickDelete = () => {

    }

    return(
        <BoardCommentListPresenterPage
            data={data}
            onClickUpdate={onClickUpdate}
            onClickDelete={onClickDelete}
            isEdit={isEdit}
        />
    )
}