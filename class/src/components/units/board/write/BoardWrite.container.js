import { useState } from "react"
import { useMutation } from "@apollo/client"
import BoardWriteUI from './BoardWrite.presenter'
import { CREATE_BOARD } from "./BoardWrite.queries"

export default function BoardWrite(){

    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const [나의함수] = useMutation(CREATE_BOARD)

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
    }

    
    const onClickSubmit = async () => {
        const result = await 나의함수({
            variables: {
                writer: writer,
                title: title,
                contents: contents
            }
        })

        console.log(result)
        alert(result.data.createBoard.message)
    }

    return(
        <BoardWriteUI
            onChangeWriter={onChangeWriter}
            onChangeTitle={onChangeTitle}
            onChangeContents={onChangeContents}
            onClickSubmit={onClickSubmit}
        />
    )

}