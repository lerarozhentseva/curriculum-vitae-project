import { IProject } from '@graphql/interfaces';

export interface IProjectsTableRowProps {
  project: IProject | null;
  isLoading: boolean;
}
