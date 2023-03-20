import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { IProject } from '@graphql/interfaces';
import { GetProjectsQuery } from '@graphql/projects';
import { formatDate } from '@pages/ProjectsPage/utils';

const useProjectsQuery = () => {
  const { data, loading, error } = useQuery<{ projects: IProject[] }>(GetProjectsQuery);

  const projects: IProject[] = useMemo(() => {
    return (
      data?.projects.map((project) => ({
        ...project,
        end_date: project.end_date || formatDate()
      })) ?? []
    );
  }, [data]);

  return { projects, loading, error };
};

export default useProjectsQuery;
