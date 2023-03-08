import { FC, useMemo } from 'react';
import { EmployeesTableRow } from '@pages/EmployeesPage/components/EmployeesTableRow';
import { useSort } from '@hooks/index';
import { AppTable } from '@components/AppTable';
import { IEmployeesTableProps, IFlattenedUser } from '.';

const EmployeesTable: FC<IEmployeesTableProps> = ({ users, isLoading }) => {
  const flattenedUsers: IFlattenedUser[] = useMemo(() => {
    return users.map((user) => ({
      ...user,
      avatar: user.profile.avatar,
      first_name: user.profile.first_name,
      last_name: user.profile.last_name
    }));
  }, [users]);

  const [sortedUsers, sortingRules, cycleSortingRules] = useSort(flattenedUsers, 'department_name');

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
    >
      {isLoading
        ? Array.from({ length: 3 }, (_, i) => (
            <EmployeesTableRow isLoading={isLoading} key={i} user={null} />
          ))
        : sortedUsers.map((user) => (
            <EmployeesTableRow isLoading={isLoading} key={user.id} user={user} />
          ))}
    </AppTable>
  );
};

export default EmployeesTable;
