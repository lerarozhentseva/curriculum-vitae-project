import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GetUsersQuery } from '@graphql/users/GetUsersQuery';
import { IUser } from '@graphql/interfaces/IUser';
import Header from '@components/Header/Header';
import Breadcrumb from '@components/Breadcrumbs/Breadcrumbs';
import { EmployeesTable } from './components/EmployeesTable';

const EmployeesPage = () => {
  const currentPath = useLocation().pathname;
  const { data, loading, error } = useQuery<{ users: IUser[] }>(GetUsersQuery);
  return (
    <>
      <Header />
      <Breadcrumb currentPath={currentPath} />
      <EmployeesTable users={data?.users ?? []} isLoading={loading} />
    </>
  );
};

export default EmployeesPage;
