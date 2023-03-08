import { ISortingRules } from '@pages/EmployeesPage/components/EmployeesTable';

export interface IEmployeesTableHeadProps {
  sortingRules: ISortingRules;
  cycleSortingRules: (field: ISortingRules['field']) => void;
}
