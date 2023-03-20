export interface ICvProjectRemoveActionProps {
  projectId: string;
  updateProjects: (action: (projectsIds: string[]) => string[]) => Promise<void>;
}
