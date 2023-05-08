import { gql } from "@apollo/client";

export const FETCH_USEDITEMS_OFTHEBEST = gql`
  query fetchUseditemsOfTheBest {
    fetchUseditemsOfTheBest {
      _id
      name
      remarks
      price
      pickedCount
      images
    }
  }
`;
