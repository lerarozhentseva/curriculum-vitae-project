import { Table, TableBody } from '@mui/material';
import { AppTableHead, IAppTableProps, AppTableContainer } from '.';

export default function AppTable<T extends any[]>({
  data,
  children,
  isLoading,
  ...props
}: IAppTableProps<T>) {
  return (
    <AppTableContainer>
      <Table>
        <AppTableHead {...props} />
        <TableBody>
          {isLoading
            ? Array.from({ length: 3 }, (_, i) => children(null, i))
            : data.map((item) => children(item, item.id))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
}
