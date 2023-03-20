import { IProject, IUpdateCvInput } from '@graphql/interfaces';

export interface ICvProjectsTableRowProps {
  project: IProject;
  isLoading: boolean;
  updateProjects: (action: (projectsIds: string[]) => string[]) => Promise<void>;
  cv: IUpdateCvInput;
}
