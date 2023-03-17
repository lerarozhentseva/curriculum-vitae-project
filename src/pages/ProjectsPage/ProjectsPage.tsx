import { useReactiveVar } from '@apollo/client';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Header } from '@components/Header';
import { useCompoundError, useFilter, useProjectsQuery } from '@hooks/index';
import { Toast } from '@components/Toast';
import { Filter } from '@components/Filter';
import { authService } from '@graphql/auth/authService';
import { ProjectsTable } from './components/ProjectsTable';
import { CreateProjectDisclosure } from './components/CreateProjectDisclosure';

const ProjectsPage = () => {
  const { projects, loading, error: nativeError } = useProjectsQuery();
  const [filteredProjects, query, onQueryChange] = useFilter(projects, 'name', 'internal_name');

  const { error, clearError } = useCompoundError(nativeError);

  const user = useReactiveVar(authService.user$);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Header />
      <Breadcrumb />
      <Filter query={query} onChange={onQueryChange} />
      {user?.role === 'admin' && <CreateProjectDisclosure />}
      <ProjectsTable projects={filteredProjects} isLoading={loading} />
    </>
  );
};

export default ProjectsPage;
