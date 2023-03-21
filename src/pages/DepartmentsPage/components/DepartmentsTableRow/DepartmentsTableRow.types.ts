import { IDepartment } from '@graphql/interfaces';

export interface IDepartmentsTableRowProps {
  department: IDepartment | null;
  isLoading: boolean;
}
