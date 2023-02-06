import { gql, useMutation } from "@apollo/client"

const CREATE_BOARD = gql`
    mutation{
        createBoard(writer: "신짱규", title: "신짱규 제목입니다", contents: "신짱규 내용입니다"){
        _id
        number
        message
        }
    }
`

export default function GraphqlMutationPage(){
    const [createBoard] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
        const result = await createBoard()
        console.log(result)
    }

    return (
        <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    )
}