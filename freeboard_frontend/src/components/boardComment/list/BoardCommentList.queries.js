import { gql } from "@apollo/client";

export const FETCH_BOARD_COMMENTS = gql`
    query fetchBoardComments($page: Int, $boardId: ID!){
        fetchBoardComments(page: $page, boardId: $boardId){
        writer
        contents
        rating
        updatedAt
        _id
        }
    }
`

export const DELETE_BOARD_COMMENT = gql`
    mutation deleteBoardComment($password: String, $boardCommentId: ID!){
        deleteBoardComment(password: $password, boardCommentId: $boardCommentId)
    }
`
