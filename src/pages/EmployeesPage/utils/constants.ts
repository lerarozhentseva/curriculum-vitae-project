import { ICreateUserInput } from '@graphql/interfaces/ICreateUserInput';

export const EMPLOYEE_ROLES = [
  { id: 0, name: 'Employee', value: 'employee' },
  { id: 1, name: 'Admin', value: 'admin' }
];

export const INITIAL_FORM_DATA: ICreateUserInput = {
  auth: {
    email: '',
    password: ''
  },
  profile: {
    first_name: '',
    last_name: '',
    skills: [],
    languages: []
  },
  cvsIds: [],
  departmentId: '',
  positionId: '',
  role: 'employee'
};
