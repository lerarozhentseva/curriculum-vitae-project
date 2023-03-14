import { TableCell, TableHead, TableRow } from '@mui/material';
import { IAppTableHeadProps, AppTableSortCell } from '.';

function AppTableHead<T extends any[]>({
  fields,
  sortingRules,
  cycleSortingRules
}: IAppTableHeadProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {fields.map((field, i) => {
          if (field)
            return (
              <AppTableSortCell
                key={field[1]}
                field={field[0]}
                rules={sortingRules}
                cycleRules={cycleSortingRules}
              >
                {field[1]}
              </AppTableSortCell>
            );
          return <TableCell key={i}></TableCell>;
        })}
      </TableRow>
    </TableHead>
  );
}

export default AppTableHead;
