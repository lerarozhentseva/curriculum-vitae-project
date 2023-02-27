import { TableCell, TableSortLabel } from '@mui/material';
import { FC } from 'react';
import { ITableSortCellProps } from '.';

const TableSortCell: FC<ITableSortCellProps> = ({ children, cycleRules, rules, field }) => {
  return (
    <TableCell onClick={() => cycleRules(field)}>
      {children}
      <TableSortLabel active={rules.field === field} direction={rules.order ? 'desc' : 'asc'} />
    </TableCell>
  );
};

export default TableSortCell;
