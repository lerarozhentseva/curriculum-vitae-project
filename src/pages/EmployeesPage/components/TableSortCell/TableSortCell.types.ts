import { ReactNode } from 'react';
import { ISortingRules } from '@pages/EmployeesPage/components/EmployeesTable';

export interface ITableSortCellProps {
  children: ReactNode;
  field: ISortingRules['field'];
  rules: ISortingRules;
  cycleRules: (field: ISortingRules['field']) => void;
}
