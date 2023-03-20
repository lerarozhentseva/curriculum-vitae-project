export interface ICvProjectAddActionProps {
  projectId: string;
  updateProjects: (action: (projectsIds: string[]) => string[]) => Promise<void>;
}
