import { useMutation, useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";

const FETCH_BOARDS = gql`
    query fetchBoards{
        fetchBoards{
            number
            writer
            title
            contents
        }
    }
`

const DELETE_BOARD = gql`
    mutation deleteBoard($number: Int){
        deleteBoard(number: $number){
        message
        }
    }
`

const Row = styled.div`
    display: flex;
`

const Column = styled.div`
    width: 25%;
`


export default function MapBoards(){
    const [deleteBoard] = useMutation(DELETE_BOARD);

    const onClickDeleteBtn = async(event) => {
        const result = await deleteBoard({
            variables: {
                number: Number(event.target.id)
            },
            refetchQueries: [{query: FETCH_BOARDS}]
        })
    
        alert(result.data.deleteBoard.message)
    }

    const {data} = useQuery(FETCH_BOARDS)

    return(
        <>
            <div>{data?.fetchBoards.map(el => (
                <Row key={el.number}>
                    <Column><input type="checkbox" /></Column>
                    <Column>{el.number}</Column>
                    <Column>{el.title}</Column>
                    <Column>{el.contents}</Column>
                    <Column>
                        <button id={el.number} onClick={onClickDeleteBtn}>삭제</button>
                    </Column>
                </Row>
            ))}</div>
        </>

    )
}