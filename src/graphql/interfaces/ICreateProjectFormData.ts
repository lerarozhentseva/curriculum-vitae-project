import { IProject } from '.';

export interface ICreateProjectFormData extends Omit<IProject, 'id' | 'created_at' | 'tech_stack' | 'end_date'> {
  end_date: string | null;
  skillsIds: string[];
}
