import { IProject } from '@graphql/interfaces';

export const CV_PROJECTS_TABLE_FIELDS: ([keyof IProject, string] | undefined)[] = [
  ['name', 'Name'],
  ['internal_name', 'Internal name'],
  ['domain', 'Domain'],
  ['start_date', 'Start'],
  ['end_date', 'End'],
  undefined
];
