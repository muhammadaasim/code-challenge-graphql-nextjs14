import { gql } from '@apollo/client';

const CREATE_FLOOR_MUTATION = gql`
  mutation CreateFloor($input: NewFloorInput!) {
    createFloor(input: $input) {
      id
      image
    }
  }
`;

export { CREATE_FLOOR_MUTATION };
