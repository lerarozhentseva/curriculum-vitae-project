import { gql } from '@apollo/client';

export const DeletePositionMutation = gql`
  mutation DeletePosition($id: ID!) {
    deletePosition(id: $id) {
      affected
    }
  }
`;

export interface IDeletePositionMutationReturnValue {
  affected: number;
}

export interface IDeletePositionMutationParameters {
  id: string;
}
