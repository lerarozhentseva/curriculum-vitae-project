import { gql } from '@apollo/client';
import { ICv } from '@graphql/interfaces';

export const DeleteCvMutation = gql`
  mutation DeleteCv($id: ID!) {
    deleteCv(id: $id) {
      affected
    }
  }
`;

export interface IDeleteCvMutationReturnValue {
  affected: number;
}

export interface IDeleteCvMutationParameters {
  id: ICv['id'];
}
