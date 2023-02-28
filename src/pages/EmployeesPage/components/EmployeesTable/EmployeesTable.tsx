import { FC, useCallback, useMemo, useState } from 'react';
import { TableBody } from '@mui/material';
import { EmployeesTableRow } from '@pages/EmployeesPage/components/EmployeesTableRow';
import { EmployeesTableHead } from '@pages/EmployeesPage/components/EmployeesTableHead';
import {
  IEmployeesTableProps,
  IFlattenedUser,
  ISortingRules,
  SortingOrder,
  EmployeesTableUI
} from '.';

const EmployeesTable: FC<IEmployeesTableProps> = ({ users, isLoading }) => {
  const [sortingRules, setSortingRules] = useState<ISortingRules>({
    field: 'department_name',
    order: SortingOrder.ASC
  });

  const flattenedUsers: IFlattenedUser[] = useMemo(() => {
    return users.map((user) => ({
      ...user,
      avatar: user.profile.avatar,
      first_name: user.profile.first_name,
      last_name: user.profile.last_name
    }));
  }, [users]);

  const sortedUsers = useMemo(() => {
    const { field, order } = sortingRules;

    return [...flattenedUsers].sort((a, b) => {
      if (!a[field]) return 1;
      if (!b[field]) return -1;

      const first = a[field] as string;
      const second = b[field] as string;

      return order === SortingOrder.ASC ? first.localeCompare(second) : second.localeCompare(first);
    });
  }, [flattenedUsers, sortingRules]);

  const cycleSortingRules = useCallback((field: keyof IFlattenedUser) => {
    setSortingRules((previous) => ({
      field,
      order: field === previous.field ? (+!previous.order as SortingOrder) : SortingOrder.ASC
    }));
  }, []);

  return (
    <EmployeesTableUI>
      <EmployeesTableHead sortingRules={sortingRules} cycleSortingRules={cycleSortingRules} />
      <TableBody>
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => (
              <EmployeesTableRow isLoading={isLoading} key={i} user={null} />
            ))
          : sortedUsers.map((user) => (
              <EmployeesTableRow isLoading={isLoading} key={user.id} user={user} />
            ))}
      </TableBody>
    </EmployeesTableUI>
  );
};

export default EmployeesTable;
