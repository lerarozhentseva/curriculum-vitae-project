import { IUser } from '@graphql/interfaces/IUser';

export interface IDeleteUserMutationReturnValue {
  affected: number;
}

export interface IDeleteUserMutationParameters {
  id: IUser['id'];
}
