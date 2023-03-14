import { gql } from '@apollo/client';

export const GetProjectQuery = gql`
  query GetProjectInfo($id: ID!) {
    project(id: $id) {
      id
      name
      created_at
      internal_name
      description
      domain
      start_date
      end_date
      tech_stack {
        id
        name
      }
      team_size
    }
  }
`;
