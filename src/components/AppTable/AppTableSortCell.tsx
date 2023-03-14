import { TableCell, TableSortLabel } from '@mui/material';
import { AppTableSortField, IAppTableSortCellProps } from '.';

function AppTableSortCell<T extends any[]>({
  children,
  cycleRules,
  rules,
  field
}: IAppTableSortCellProps<T>) {
  return (
    <TableCell sx={{ minWidth: '105px' }}>
      <AppTableSortField disableRipple onClick={() => cycleRules(field)}>
        {children}
      </AppTableSortField>
      <TableSortLabel active={rules.field === field} direction={rules.order ? 'desc' : 'asc'} />
    </TableCell>
  );
}

export default AppTableSortCell;
