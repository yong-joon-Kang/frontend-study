import { gql } from "@apollo/client";

export const FETCH_BOARD_COMMENTS = gql`
    query fetchBoardComments($page: Int, $boardId: ID!){
        fetchBoardComments(page: $page, boardId: $boardId){
        writer
        contents
        rating
        updatedAt
        }
    }
`

export const CREATE_BOARD_COMMENT = gql`
    mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!){
        createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput){
        _id
        }
    }
`

