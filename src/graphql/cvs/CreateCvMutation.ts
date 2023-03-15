import { gql } from '@apollo/client';

export const CreateCvMutation = gql`
  mutation CreateCv($cv: CvInput!) {
    createCv(cv: $cv) {
      id
      created_at
      name
      description
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
