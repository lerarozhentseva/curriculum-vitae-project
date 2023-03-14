import { ICreateProjectFormData } from '@graphql/interfaces';

export const INITIAL_CREATE_DATA: ICreateProjectFormData = {
  name: '',
  internal_name: '',
  description: '',
  domain: '',
  team_size: 0,
  skillsIds: [],
  start_date: '',
  end_date: ''
};
