import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
  ) {
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
      }
    ) {
      _id
    }
  }
`;

export const EDIT_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
    }
  }
`;
