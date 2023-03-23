import { gql } from '@apollo/client';

export const UpdatePositionMutation = gql`
  mutation UpdatePosition($id: ID!, $position: PositionInput!) {
    updatePosition(id: $id, position: $position) {
      id
      created_at
      name
    }
  }
`;
