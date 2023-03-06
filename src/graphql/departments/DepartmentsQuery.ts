import { gql } from '@apollo/client';

export const DepartmentsQuery = gql`
  query Departments {
    departments {
      id
      created_at
      name
    }
  }
`;
