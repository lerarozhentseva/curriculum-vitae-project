import { FC, useMemo } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { TableSortCell } from '@pages/EmployeesPage/components/TableSortCell';
import { IEmployeesTableHeadProps } from '.';

const EmployeesTableHead: FC<IEmployeesTableHeadProps> = ({ sortingRules, cycleSortingRules }) => {
  const cellProps = useMemo(() => {
    return {
      rules: sortingRules,
      cycleRules: cycleSortingRules
    };
  }, [sortingRules, cycleSortingRules]);

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableSortCell field="first_name" {...cellProps}>
          First Name
        </TableSortCell>
        <TableSortCell field="last_name" {...cellProps}>
          Last Name
        </TableSortCell>
        <TableSortCell field="email" {...cellProps}>
          Email
        </TableSortCell>
        <TableSortCell field="department_name" {...cellProps}>
          Department
        </TableSortCell>
        <TableSortCell field="position_name" {...cellProps}>
          Position
        </TableSortCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EmployeesTableHead;
