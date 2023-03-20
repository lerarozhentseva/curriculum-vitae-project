import { FC, useCallback } from 'react';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { ICvProjectAddActionProps } from '.';

const CvProjectAddAction: FC<ICvProjectAddActionProps> = ({ projectId, updateProjects }) => {
  const addProject = useCallback(async () => {
    await updateProjects((projectsIds) => projectsIds.concat(projectId));
  }, [projectId, updateProjects]);

  return (
    <IconButton onClick={addProject}>
      <Add />
    </IconButton>
  );
};

export default CvProjectAddAction;
