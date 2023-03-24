import { gql } from '@apollo/client';

export const UpdateLanguageMutation = gql`
  mutation UpdateLanguage($id: ID!, $language: LanguageInput!) {
    updateLanguage(id: $id, language: $language) {
      id
      iso2
      name
      native_name
      created_at
    }
  }
`;
