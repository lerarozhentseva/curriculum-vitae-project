import { gql } from '@apollo/client';

export const CreatePositionMutation = gql`
  mutation CreatePosition($position: PositionInput!) {
    createPosition(position: $position) {
      id
      created_at
      name
    }
  }
`;
