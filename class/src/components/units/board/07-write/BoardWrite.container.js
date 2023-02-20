import { useState } from "react"
import { useMutation } from "@apollo/client"
import BoardWriteUI from './BoardWrite.presenter'
import { CREATE_BOARD } from "./BoardWrite.queries"

export default function BoardWrite(){

    const [mycolor, setMycolor] = useState("")

    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const [나의함수] = useMutation(CREATE_BOARD)

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
        if(event.target.value && title && contents){
            setMycolor(true)
        }else{
            setMycolor(false)
        }
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
        if(writer && event.target.value && contents){
            setMycolor(true)
        }else{
            setMycolor(false)
        }
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
        if(writer && title && event.target.value){
            setMycolor(true)
        }else{
            setMycolor(false)
        }
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
            mycolor={mycolor}
        />
    )

}