import { useQuery, useReactiveVar } from '@apollo/client';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Toast } from '@components/Toast';
import { GetDepartmentsQuery } from '@graphql/departments';
import { IDepartment } from '@graphql/interfaces';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@graphql/user/isAdmin';
import { useCompoundError, useFilter } from '@hooks/index';
import { DepartmentsTable } from './components/DepartmentsTable';
import { CreateDepartmentForm } from './components/CreateDepartmentForm';

const DepartmentsPage = () => {
  const { data, loading, error: nativeError } = useQuery<{ departments: IDepartment[] }>(
    GetDepartmentsQuery
  );

  const [filteredDepartments, query, onQueryChange] = useFilter(data?.departments ?? [], 'name');

  const { error, clearError } = useCompoundError(nativeError);

  const user = useReactiveVar(authService.user$);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Header />
      <Breadcrumb />
      {isAdmin(user) && <CreateDepartmentForm />}
      <Filter query={query} onChange={onQueryChange} />
      <DepartmentsTable departments={filteredDepartments} isLoading={loading} />
    </>
  );
};

export default DepartmentsPage;
