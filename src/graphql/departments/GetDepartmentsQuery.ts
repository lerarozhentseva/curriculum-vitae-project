import { gql } from '@apollo/client';

export const GetDepartmentsQuery = gql`
  query GetDepartments {
    departments {
      id
      created_at
      name
    }
  }
`;
