import { IProject } from '@graphql/interfaces';

export interface IProjectsTableRowProps {
  project: IProject | null;
  isLoading: boolean;
  actions: (project: IProject) => JSX.Element;
}
