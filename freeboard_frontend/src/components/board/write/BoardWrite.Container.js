import BoardWritePresenterPage from "./BoardWrite.presenter"
import { CREATE_BOARD, EDIT_BOARD } from "./BoardWrite.queries"
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { useRouter } from "next/router"

export default function BoardWriteContainerPage(props){
    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(EDIT_BOARD)

    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const [writerErr, setWriterErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [titleErr, setTitleErr] = useState("")
    const [contentsErr, setContentsErr] = useState("")

    const [chkRegist, setChkRegist] = useState(Boolean)

    const router = useRouter();

    const onWriterChanged = (event) => {
        setWriter(event.target.value)

        if(event.target.value && password && title && contents){
            setChkRegist(true)
        }else {
            setChkRegist(false)
        }
    }

    const onPasswordChanged = (event) => {
        setPassword(event.target.value)

        if(writer && event.target.value && title && contents){
            setChkRegist(true)
        }else {
            setChkRegist(false)
        }
    }

    const onTitleChanged = (event) => {
        setTitle(event.target.value)

        if(writer && password && event.target.value && contents){
            setChkRegist(true)
        }else {
            setChkRegist(false)
        }
    }

    const onContentsChanged = (event) => {
        setContents(event.target.value)

        if(writer && password && title && event.target.value){
            setChkRegist(true)
        }else {
            setChkRegist(false)
        }
    }
    
    const onSubmit = async () => {
        
        if(writer === ""){
            setWriterErr("작성자는 필수입력 입니다.")
        }else{
            setWriterErr("")
        }

        if(password === ""){
            setPasswordErr("비밀번호는 필수입력 입니다.")
        }else{
            setPasswordErr("")
        }

        if(title === ""){
            setTitleErr("제목은 필수입력 입니다.")
        }else{
            setTitleErr("")
        }

        if(contents === ""){
            setContentsErr("내용은 필수입력 입니다.")
        }else{
            setContentsErr("")
        }
        
        try{
            if(writer && password && title && contents){
                console.log(router.query.id)
                console.log(title, contents)
                if(props.isEdit){
                    console.log("gooooooooooooooooooooood")
                    const result = await updateBoard({
                        variables: {
                            boardId: router.query.id,
                            password: password,
                            updateBoardInput: {
                                title: title,
                                contents: contents
                            }
                        }
                    })
                    console.log(result)
                    alert("정상적으로 수정되었습니다.")
                    router.push(`/boards/detail/${result.data.updateBoard._id}`)
                }else{
                    const result = await createBoard({
                        variables: {
                            writer: writer,
                            password: password,
                            title: title,
                            contents: contents
                        }
                    })
                    console.log(result)
                    alert("정상적으로 등록되었습니다.")
                    router.push(`/boards/detail/${result.data.createBoard._id}`)
                }
                
                
            }
        }catch{

        }
        

    }

    return(
        <BoardWritePresenterPage
        writerErr={writerErr}
        passwordErr={passwordErr}
        titleErr={titleErr}
        contentsErr={contentsErr}
        onWriterChanged={onWriterChanged}
        onPasswordChanged={onPasswordChanged}
        onTitleChanged={onTitleChanged}
        onContentsChanged={onContentsChanged}
        onSubmit={onSubmit}
        chkRegist={chkRegist}
        isEdit={props.isEdit}
        />
    )
}