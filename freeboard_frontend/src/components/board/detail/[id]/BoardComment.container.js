import BoardCommentPresenterPage from "./BoardComment.presenter";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_BOARD_COMMENTS, CREATE_BOARD_COMMENT } from "./BoardComment.queries"
import { useRouter } from "next/router";
import { useState } from "react";

export default function BoardCommentContainerPage(){

    const [contents, setContents] = useState()

    const router = useRouter()

    const { data } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: {
            page: 1,
            boardId: router.query.id
        }
    })

    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT)
    const onClickCmtWrite = async() => {
        try{
            const result = await createBoardComment({
                variables: {
                    boardId: router.query.id,
                    createBoardCommentInput: {
                        writer: "test writer",
                        password: "1234",
                        contents: contents,
                        rating: 5
                    }
                }
            })

            console.log(result)
        }catch(error){
            console.log(error.message)
        }
    }

    const onChangeTextArea = (event) => {
        setContents(event.target.value)
    }

    return(
        <BoardCommentPresenterPage
            data={data}
            onClickCmtWrite={onClickCmtWrite}
            onChangeTextArea={onChangeTextArea}
        />
    )
}