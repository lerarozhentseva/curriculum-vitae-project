import { IProject } from '@graphql/interfaces';

export interface IProjectsTableProps {
  projects: IProject[];
  isLoading: boolean;
}
