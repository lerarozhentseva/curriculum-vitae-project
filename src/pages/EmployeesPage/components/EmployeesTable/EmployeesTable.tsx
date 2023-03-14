import { FC, useMemo } from 'react';
import { EmployeesTableRow } from '@pages/EmployeesPage/components/EmployeesTableRow';
import { useSort } from '@hooks/index';
import { AppTable } from '@components/AppTable';
import { IFlattenedUser } from '@pages/EmployeesPage/EmployeesPage.types';
import { IEmployeesTableProps } from '.';

const EmployeesTable: FC<IEmployeesTableProps> = ({ users, isLoading }) => {
  const [sortedUsers, sortingRules, cycleSortingRules] = useSort(users, 'department_name');

  const fields: ([keyof IFlattenedUser, string] | undefined)[] = useMemo(
    () => [
      undefined,
      ['first_name', 'First name'],
      ['last_name', 'Last name'],
      ['email', 'Email'],
      ['department_name', 'Department'],
      ['position_name', 'Position'],
      undefined
    ],
    []
  );

  return (
    <AppTable<IFlattenedUser[]>
      sortingRules={sortingRules}
      cycleSortingRules={cycleSortingRules}
      fields={fields}
      isLoading={isLoading}
      data={sortedUsers}
    >
      {(user, key) => <EmployeesTableRow user={user} key={key} isLoading={isLoading} />}
    </AppTable>
  );
};

export default EmployeesTable;
