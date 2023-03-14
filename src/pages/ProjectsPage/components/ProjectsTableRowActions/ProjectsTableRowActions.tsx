import { useReactiveVar } from '@apollo/client';
import { OpenInFull } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteProjectDisclosure } from '@pages/ProjectsPage/components/DeleteProjectDisclosure';
import { authService } from '@graphql/auth/authService';
import { IProjectsTableRowActionsProps } from '.';

const ProjectsTableRowActions: FC<IProjectsTableRowActionsProps> = memo(({ project }) => {
  const user = useReactiveVar(authService.user$);
  const router = useNavigate();

  const visitProjectDetails = useCallback(() => {
    router(`/projects/${project?.id}`);
  }, []);

  return (
    <>
      <IconButton onClick={visitProjectDetails}>
        <OpenInFull />
      </IconButton>
      {user?.role === 'admin' && <DeleteProjectDisclosure project={project} />}
    </>
  );
});

export default ProjectsTableRowActions;
