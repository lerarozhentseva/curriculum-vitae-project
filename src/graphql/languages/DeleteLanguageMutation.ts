import { gql } from '@apollo/client';

export const DeleteLanguageMutation = gql`
  mutation DeleteLanguage($id: ID!) {
    deleteLanguage(id: $id) {
      affected
    }
  }
`;
