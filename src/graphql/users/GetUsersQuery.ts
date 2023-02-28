import { gql } from '@apollo/client';

export const GetUsersQuery = gql`
  query GetUsers {
    users {
      id
      email
      profile {
        full_name
        first_name
        last_name
        avatar
      }
      department_name
      position_name
    }
  }
`;
