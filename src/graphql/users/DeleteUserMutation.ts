import { gql } from '@apollo/client';

export const DeleteUserMutation = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      affected
    }
  }
`;
