import { IDepartment } from '@graphql/interfaces';

export interface IDepartmentsTableProps {
  departments: IDepartment[];
  isLoading: boolean;
}
