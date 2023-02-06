import { gql, useMutation, useQuery } from "@apollo/client"
import { useState } from "react"

const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $title: String, $contents: String){
        createBoard(writer: $writer, title: $title, contents: $contents){
        message
        number
        }
    }
`

const FETCH_BOARD = gql`
    query{
        fetchBoard(number: 13595){
        writer
        title
        contents
        }
    }
`

export default function GraphqlPracticePage(){

    const [createBoard] = useMutation(CREATE_BOARD)
    const { loading, error, data } = useQuery(FETCH_BOARD)

    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const onApiRequestClick = async() => {
        const result = await createBoard({
            variables: {
                writer: writer,
                title: title,
                contents: contents
            }
        })

        console.log(result.data.createBoard.number)
    }

    const onShowBoardClick = async () => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        console.log(data)
    }

    const onWriterChange = (event) => {
        setWriter(event.target.value)
    }

    const onTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const onContentsChange = (event) => {
        setContents(event.target.value)
    }

    return(
        <>
            작성자: <input type="text" onChange={onWriterChange} />
            제목: <input type="text" onChange={onTitleChange} />
            내용: <input type="text" onChange={onContentsChange} />
            <button onClick={onApiRequestClick}>게시글 등록</button>
            <button onClick={onShowBoardClick}>게시글 조회</button>
        </>
    )
}