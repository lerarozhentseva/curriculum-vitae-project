import { gql } from '@apollo/client';

export const GetProjectsQuery = gql`
  query GetProjects {
    projects {
      id
      name
      internal_name
      domain
      start_date
      end_date
    }
  }
`;
