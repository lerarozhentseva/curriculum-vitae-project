import { FC } from 'react';
import { TableCell, TableSortLabel } from '@mui/material';
import { TableSortField, ITableSortCellProps } from '.';

const TableSortCell: FC<ITableSortCellProps> = ({ children, cycleRules, rules, field }) => {
  return (
    <TableCell>
      <TableSortField disableRipple onClick={() => cycleRules(field)}>
        {children}
      </TableSortField>
      <TableSortLabel active={rules.field === field} direction={rules.order ? 'desc' : 'asc'} />
    </TableCell>
  );
};

export default TableSortCell;
