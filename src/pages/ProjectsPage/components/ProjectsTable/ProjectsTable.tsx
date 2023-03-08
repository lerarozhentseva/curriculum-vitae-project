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
    >
      {isLoading
        ? Array.from({ length: 3 }, (_, i) => (
            <ProjectsTableRow key={i} project={null} isLoading={isLoading} />
          ))
        : sortedProjects.map((project) => (
            <ProjectsTableRow key={project.id} project={project} isLoading={isLoading} />
          ))}
    </AppTable>
  );
};

export default ProjectsTable;
