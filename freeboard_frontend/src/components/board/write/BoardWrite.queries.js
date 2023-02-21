import { gql } from "@apollo/client"

export const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $password: String, $title: String!, $contents: String!){
        createBoard(createBoardInput:{
          writer: $writer
          password: $password
          title: $title
          contents: $contents
        }){
          _id
        }
      }
`