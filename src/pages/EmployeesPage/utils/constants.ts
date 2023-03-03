import { ICreateUserFormData } from '@graphql/interfaces/ICreateUserFormData';
import { IUpdateUserFormData } from '@graphql/interfaces/IUpdateUserFormData';

export const EMPLOYEE_ROLES = [
  { id: 0, name: 'Employee', value: 'employee' },
  { id: 1, name: 'Admin', value: 'admin' }
];

export const INITIAL_UPDATE_DATA: IUpdateUserFormData = {
  profile: {
    first_name: '',
    last_name: '',
    skills: [],
    languages: []
  },
  cvsIds: [],
  departmentId: '',
  positionId: ''
};

export const INITIAL_CREATE_DATA: ICreateUserFormData = {
  ...INITIAL_UPDATE_DATA,
  auth: {
    email: '',
    password: ''
  },
  role: 'employee'
};
