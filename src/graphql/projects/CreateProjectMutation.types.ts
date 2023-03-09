import { IProject, ICreateProjectFormData } from '@graphql/interfaces';

export interface ICreateProjectMutationParameters {
  project: ICreateProjectFormData;
}

export interface ICreateProjectMutationReturnValue {
  id: IProject['id'];
}
