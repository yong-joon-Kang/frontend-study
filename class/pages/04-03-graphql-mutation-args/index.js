import { gql, useMutation } from "@apollo/client"

const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $title: String, $contents: String) {
        createBoard(writer: $writer, title: $title, contents: $contents){
        _id
        number
        message
        }
    }
`

export default function GraphqlMutationPage(){
    const [createBoard] = useMutation(CREATE_BOARD)

    const onClickSubmit = async () => {
        const result = await createBoard({
            variables: {
                writer: "신쟝구",
                title: "신장구 타이틀",
                contents: "신장구 콘텐츠"
            }
        })
        console.log(result)
    }

    return (
        <button onClick={onClickSubmit}>GRAPHQL-API(동기) 요청하기</button>
    )
}