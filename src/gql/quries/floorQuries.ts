import { gql } from "@apollo/client";

const GET_FLOOR_QUERY = gql`
  query GetFloor($id: ID!) {
    floor(id: $id) {
      id
      image
      machines {
        id
        name
        state
        x
        y
      }
    }
  }
`;

export { GET_FLOOR_QUERY };
