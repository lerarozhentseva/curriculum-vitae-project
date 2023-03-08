import { Table, TableBody } from '@mui/material';
import { AppTableHead, IAppTableProps, AppTableContainer } from '.';

export default function AppTable<T extends any[]>({ children, ...props }: IAppTableProps<T>) {
  return (
    <AppTableContainer>
      <Table>
        <AppTableHead {...props} />
        <TableBody>{children}</TableBody>
      </Table>
    </AppTableContainer>
  );
}
