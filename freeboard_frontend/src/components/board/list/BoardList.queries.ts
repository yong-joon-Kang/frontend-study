import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query {
    fetchBoards(page: 1) {
      writer
      title
      createdAt
      _id
    }
  }
`;
