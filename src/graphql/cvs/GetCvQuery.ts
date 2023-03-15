import { gql } from '@apollo/client';

export const GetCvQuery = gql`
  query GetCv($id: ID!) {
    cv(id: $id) {
      id
      name
      description
      user {
        profile {
          id
          full_name
        }
        position_name
      }
      skills {
        skill_name
        mastery
      }
      languages {
        language_name
        proficiency
      }
      is_template
    }
  }
`;
