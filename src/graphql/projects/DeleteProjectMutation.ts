import { gql } from '@apollo/client';

export const DeleteProjectMutation = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      affected
    }
  }
`;
