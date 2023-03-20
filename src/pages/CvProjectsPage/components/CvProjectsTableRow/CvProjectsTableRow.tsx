import { FC } from 'react';
import { ProjectsTableRow } from '@pages/ProjectsPage/components/ProjectsTableRow';
import { CvProjectRemoveAction } from '@pages/CvProjectsPage/components/CvProjectRemoveAction';
import { CvProjectAddAction } from '@pages/CvProjectsPage/components/CvProjectAddAction';
import { ICvProjectsTableRowProps } from '.';

const CvProjectsTableRow: FC<ICvProjectsTableRowProps> = ({
  project,
  isLoading,
  updateProjects,
  cv
}) => {
  return (
    <ProjectsTableRow
      project={project}
      isLoading={isLoading}
      actions={() =>
        cv.projectsIds.includes(project.id) ? (
          <CvProjectRemoveAction projectId={project.id} updateProjects={updateProjects} />
        ) : (
          <CvProjectAddAction projectId={project.id} updateProjects={updateProjects} />
        )
      }
    />
  );
};

export default CvProjectsTableRow;
