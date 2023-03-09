import { IProject } from '@graphql/interfaces';

export interface IDeleteProjectMutationReturnValue {
  affected: number;
}

export interface IDeleteProjectMutationParameters {
  id: IProject['id'];
}
