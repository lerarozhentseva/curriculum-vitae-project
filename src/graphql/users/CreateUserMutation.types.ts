import { ICreateUserFormData } from '@graphql/interfaces/ICreateUserFormData';

export interface ICreateUserMutationParameters {
  user: ICreateUserFormData;
}

export interface ICreateUserMutationReturnType {
  id: string;
}
