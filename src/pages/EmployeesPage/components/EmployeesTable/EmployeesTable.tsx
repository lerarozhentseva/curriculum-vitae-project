import { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { EmployeesTableRow } from '@pages/EmployeesPage/components/EmployeesTableRow';
import { IEmployeesTableProps } from '.';

const EmployeesTable: FC<IEmployeesTableProps> = ({ users, isLoading }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Position</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => (
              <EmployeesTableRow isLoading={isLoading} key={i} user={null} />
            ))
          : users.map((user) => (
              <EmployeesTableRow isLoading={isLoading} key={user.id} user={user} />
            ))}
      </TableBody>
    </Table>
  );
};

export default EmployeesTable;
