import { ICv } from '.';

export interface IUpdateCvFormData
  extends Omit<ICv, 'skills' | 'languages' | 'user' | 'id' | 'created_at' | 'projects'> {
  skills: string[];
  languages: string[];
  userId: string | null;
  projectsIds: string[];
}
