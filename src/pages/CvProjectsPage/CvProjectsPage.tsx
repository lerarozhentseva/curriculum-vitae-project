import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { ICv, IUpdateCvInput } from '@graphql/interfaces';
import { GetCvQuery } from '@graphql/cvs';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Header } from '@components/Header';
import { useCompoundError, useFilter, useProjectsQuery } from '@hooks/index';
import { PageLoader } from '@components/PageLoader';
import { Toast } from '@components/Toast';
import { Filter } from '@components/Filter';
import { CvProjectsTable } from './components/CvProjectsTable';
import { CvProjectsSwitch } from './components/CvProjectsSwitch';

const CvProjectsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, loading: projectsLoading, error: projectsError } = useProjectsQuery();
  const { data, loading: cvLoading, error: cvError } = useQuery<{ cv: ICv }>(GetCvQuery, {
    variables: { id }
  });

  const cv: IUpdateCvInput | null = useMemo(() => {
    return data
      ? {
          id: data.cv.id,
          name: data.cv.name,
          description: data.cv.description,
          skills: data.cv.skills,
          languages: data.cv.languages,
          projectsIds: data.cv.projects.map((project) => project.id),
          userId: data.cv.user?.id ?? null,
          is_template: data.cv.is_template
        }
      : null;
  }, [data]);

  const [onlyShowAdded, setOnlyShowAdded] = useState(true);

  const toggleOnlyShowAdded = useCallback(() => {
    setOnlyShowAdded((previous) => !previous);
  }, []);

  const shownProjects = useMemo(() => {
    return onlyShowAdded
      ? projects.filter((project) => cv?.projectsIds.includes(project.id))
      : projects;
  }, [projects, onlyShowAdded, data]);

  const [filteredProjects, query, onQueryChange] = useFilter(
    shownProjects,
    'name',
    'internal_name'
  );

  const isLoading = projectsLoading || cvLoading;
  const { error, clearError } = useCompoundError(cvError, projectsError);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Header />
      <Breadcrumb />
      <Filter query={query} onChange={onQueryChange} />
      <CvProjectsSwitch checked={onlyShowAdded} onChange={toggleOnlyShowAdded} />
      {isLoading ? (
        <PageLoader />
      ) : cv ? (
        <CvProjectsTable projects={filteredProjects} cv={cv} isLoading={isLoading} />
      ) : (
        <Typography>Related CV could not be found</Typography>
      )}
    </>
  );
};

export default CvProjectsPage;
