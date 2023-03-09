import { gql } from '@apollo/client';

export const CreateProjectMutation = gql`
  mutation CreateProject($project: ProjectInput!) {
    createProject(project: $project) {
      id
    }
  }
`;
