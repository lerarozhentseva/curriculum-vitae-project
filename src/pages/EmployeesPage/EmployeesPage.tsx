import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GetUsersQuery } from '@graphql/users/GetUsersQuery';
import { IUser } from '@graphql/interfaces/IUser';
import { authService } from '@graphql/auth/authService';
import Header from '@components/Header/Header';
import Breadcrumb from '@components/Breadcrumbs/Breadcrumbs';
import Toast from '@components/Toast/Toast';
import useCompoundError from '@hooks/useCompoundError';
import { EmployeesTable } from './components/EmployeesTable';
import { EmployeesFilter } from './components/EmployeesFilter';
import { CreateEmployeeDisclosure } from './components/CreateEmployeeDisclosure';

const EmployeesPage = () => {
  const { data, loading, error: nativeError } = useQuery<{ users: IUser[] }>(GetUsersQuery);

  const user = useReactiveVar(authService.user$);

  const [query, setQuery] = useState('');

  const onQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!query) return data?.users ?? [];
    return data?.users.filter((user) => user.profile.full_name?.includes(query)) ?? [];
  }, [data, query]);

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
