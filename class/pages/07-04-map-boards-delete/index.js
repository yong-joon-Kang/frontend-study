import { useQuery, gql } from "@apollo/client";
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

const Row = styled.div`
    display: flex;
`

const Column = styled.div`
    width: 25%;
`


export default function MapBoards(){

    const {data} = useQuery(FETCH_BOARDS)

    return(
        <>
            <div>{data?.fetchBoards.map(el => (
                <Row>
                    <Column><input type="checkbox" /></Column>
                    <Column>{el.number}</Column>
                    <Column>{el.title}</Column>
                    <Column>{el.contents}</Column>
                </Row>
            ))}</div>
        </>

    )
}