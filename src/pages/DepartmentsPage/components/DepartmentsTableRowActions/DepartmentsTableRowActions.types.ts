import { IDepartment } from '@graphql/interfaces';

export interface IDepartmentsTableRowActionsProps {
  department: IDepartment;
  isEditing: boolean;
  name: string;
  enableEditing: () => void;
  disableEditing: () => void;
}
