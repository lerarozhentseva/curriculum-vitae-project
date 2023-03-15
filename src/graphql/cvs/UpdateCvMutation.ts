import { gql } from '@apollo/client';

export const UpdateCvMutation = gql`
  mutation UpdateCv($id: ID!, $cv: CvInput!) {
    updateCv(id: $id, cv: $cv) {
      id
    }
  }
`;
