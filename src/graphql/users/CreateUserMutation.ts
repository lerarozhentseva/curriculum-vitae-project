import { gql } from '@apollo/client';

export const CreateUserMutation = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`;
