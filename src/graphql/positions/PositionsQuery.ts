import { gql } from '@apollo/client';

export const PositionsQuery = gql`
  query Positions {
    positions {
      id
      created_at
      name
    }
  }
`;
