import { gql } from '@apollo/client';

const CREATE_MACHINE_MUTATION = gql`
  mutation CreateMachine($input: NewMachineInput!) {
    createMachine(input: $input) {
      id
      name
      state
      x
      y
    }
  }
`;

const UPDATE_MACHINE_MUTATION = gql`
  mutation UpdateMachine($id: ID!, $input: UpdateMachineInput!) {
    updateMachine(id: $id, input: $input) {
      id
      x
      y
      state
    }
  }
`;

export { CREATE_MACHINE_MUTATION, UPDATE_MACHINE_MUTATION };
