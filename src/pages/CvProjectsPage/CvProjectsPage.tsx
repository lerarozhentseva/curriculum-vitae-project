import { useQuery } from '@apollo/client';
import { IProject } from '@graphql/interfaces';
import { AppTable } from '@components/AppTable';
import { Breadcrumb } from '@components/Breadcrumbs';
import { Header } from '@components/Header';
import { useSort } from '@hooks/index';
import { GetProjectsQuery } from '@graphql/projects';
import { ProjectsTableRow } from '@pages/ProjectsPage/components/ProjectsTableRow';
import { CV_PROJECTS_TABLE_FIELDS } from './utils';

const CvProjectsPage = () => {
  const { data: projectsData, loading: projectsLoading } = useQuery<{ projects: IProject[] }>(
    GetProjectsQuery
  );

  const [sortedProjects, sortingRules, cycleSortingRules] = useSort(
    projectsData?.projects ?? [],
    'name'
  );

  return (
    <>
      <Header />
      <Breadcrumb />
      {projectsData && (
        <AppTable
          fields={CV_PROJECTS_TABLE_FIELDS}
          isLoading={projectsLoading}
          data={sortedProjects}
          sortingRules={sortingRules}
          cycleSortingRules={cycleSortingRules}
        >
          {(project, key) => (
            <ProjectsTableRow project={project} key={key} isLoading={projectsLoading} />
          )}
        </AppTable>
      )}
    </>
  );
};

export default CvProjectsPage;
