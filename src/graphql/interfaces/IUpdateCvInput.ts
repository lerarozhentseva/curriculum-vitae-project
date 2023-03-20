import { ICv } from '.';

export interface IUpdateCvInput extends Omit<ICv, 'projects' | 'user' | 'created_at'> {
  projectsIds: string[];
  userId: string | null;
}
