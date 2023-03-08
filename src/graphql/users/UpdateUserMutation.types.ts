import { IUpdateUserFormData } from '@graphql/interfaces/IUpdateUserFormData';

export interface IUpdateUserMutationParameters {
  id: string;
  user: IUpdateUserFormData;
}

export interface IUpdateUserMutationReturnType {
  id: string;
}
