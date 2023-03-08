import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { formatDate } from '@pages/ProjectsPage/utils';
import { useSkeleton } from '@hooks/index';
import { IProjectsTableRowProps } from '.';

const ProjectsTableRow: FC<IProjectsTableRowProps> = ({ project, isLoading }) => {
  const tryShow = useSkeleton(isLoading);

  return (
    <TableRow key={project?.id}>
      <TableCell>{tryShow(project?.name, 'text')}</TableCell>
      <TableCell>{tryShow(project?.internal_name, 'text')}</TableCell>
      <TableCell>{tryShow(project?.domain, 'text')}</TableCell>
      <TableCell>{tryShow(project?.start_date, 'text')}</TableCell>
      <TableCell>
        {tryShow(
          project?.end_date === formatDate() ? 'Till now' : '' + (project?.end_date ?? ''),
          'text'
        )}
      </TableCell>
    </TableRow>
  );
};

export default ProjectsTableRow;
