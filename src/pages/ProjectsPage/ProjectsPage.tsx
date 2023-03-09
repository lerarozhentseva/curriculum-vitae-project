import { useQuery, useReactiveVar } from '@apollo/client';
import { useMemo } from 'react';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Header } from '@components/Header';
import { GetProjectsQuery } from '@graphql/projects';
import { IProject } from '@graphql/interfaces';
import { useCompoundError, useFilter } from '@hooks/index';
import { Toast } from '@components/Toast';
import { Filter } from '@components/Filter';
import { authService } from '@graphql/auth/authService';
import { formatDate } from './utils';
import { ProjectsTable } from './components/ProjectsTable';
import { CreateProjectDisclosure } from './components/CreateProjectDisclosure';

const ProjectsPage = () => {
  const { data, loading, error: nativeError } = useQuery<{ projects: IProject[] }>(
    GetProjectsQuery
  );

  const projects: IProject[] = useMemo(() => {
    return (
      data?.projects.map((project) => ({
        ...project,
        end_date: project.end_date || formatDate()
      })) ?? []
    );
  }, [data]);

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
