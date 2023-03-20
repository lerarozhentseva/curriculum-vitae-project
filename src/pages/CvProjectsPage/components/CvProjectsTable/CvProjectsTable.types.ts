import { IProject, IUpdateCvInput } from '@graphql/interfaces';

export interface ICvProjectsTableProps {
  projects: IProject[];
  cv: IUpdateCvInput;
  isLoading: boolean;
}
