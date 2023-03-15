import { gql } from '@apollo/client';

export const GetSkillsQuery = gql`
  query GetSkills {
    skills {
      id
      name
    }
  }
`;
