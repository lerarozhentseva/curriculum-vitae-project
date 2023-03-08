import { useMemo } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GetUsersQuery } from '@graphql/users';
import { IUser } from '@graphql/interfaces';
import { authService } from '@graphql/auth/authService';
import { Header } from '@components/Header';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Toast } from '@components/Toast';
import { useCompoundError, useFilter } from '@hooks/index';
import { EmployeesTable } from './components/EmployeesTable';
import { EmployeesFilter } from './components/EmployeesFilter';
import { CreateEmployeeDisclosure } from './components/CreateEmployeeDisclosure';
import { IFlattenedUser } from '.';

const EmployeesPage = () => {
  const { data, loading, error: nativeError } = useQuery<{ users: IUser[] }>(GetUsersQuery);
  const flattenedUsers: IFlattenedUser[] = useMemo(() => {
    return (
      data?.users.map((user) => ({
        ...user,
        first_name: user.profile.first_name,
        last_name: user.profile.last_name,
        full_name: user.profile.full_name,
        avatar: user.profile.avatar
      })) ?? []
    );
  }, [data]);

  const [filteredUsers, query, onQueryChange] = useFilter(flattenedUsers, 'full_name');

  const user = useReactiveVar(authService.user$);

  const { error, clearError } = useCompoundError(nativeError);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Header />
      <Breadcrumb />
      <EmployeesFilter query={query} onChange={onQueryChange} />
      {user?.role === 'admin' && <CreateEmployeeDisclosure />}
      <EmployeesTable users={filteredUsers} isLoading={loading} />
    </>
  );
};

export default EmployeesPage;
