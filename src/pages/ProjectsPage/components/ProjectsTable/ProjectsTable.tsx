import { FC, useMemo } from 'react';
import { AppTable } from '@components/AppTable';
import { IProject } from '@graphql/interfaces';
import { useSort } from '@hooks/index';
import { ProjectsTableRow } from '../ProjectsTableRow';
import { IProjectsTableProps } from '.';

const ProjectsTable: FC<IProjectsTableProps> = ({ projects, isLoading }) => {
  const [sortedProjects, sortingRules, cycleSortingRules] = useSort(projects, 'domain');

  const fields: ([keyof IProject, string] | undefined)[] = useMemo(
    () => [
      ['name', 'Name'],
      ['internal_name', 'Internal name'],
      ['domain', 'Domain'],
      ['start_date', 'Start'],
      ['end_date', 'End'],
      undefined
    ],
    []
  );

  return (
    <AppTable<IProject[]>
      sortingRules={sortingRules}
      cycleSortingRules={cycleSortingRules}
      fields={fields}
      data={sortedProjects}
      isLoading={isLoading}
    >
      {(project, key) => <ProjectsTableRow project={project} isLoading={isLoading} key={key} />}
    </AppTable>
  );
};

export default ProjectsTable;
