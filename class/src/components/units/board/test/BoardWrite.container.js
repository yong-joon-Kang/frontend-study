import { useState } from "react"
import BoardWriteUI from './BoardWrite.presenter'

export default function BoardWrite(){

    const [writer, setWriter] = useState("")

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
        
        console.log(`writer: ${writer}`)
    }

    return(
        <BoardWriteUI
            onChangeWriter={onChangeWriter}
        />
    )

}