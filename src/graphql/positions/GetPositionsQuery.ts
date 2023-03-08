import { gql } from '@apollo/client';

export const GetPositionsQuery = gql`
  query GetPositions {
    positions {
      id
      created_at
      name
    }
  }
`;
