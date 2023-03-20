import { FC, useCallback } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ICvProjectRemoveActionProps } from '.';

const CvProjectRemoveAction: FC<ICvProjectRemoveActionProps> = ({ projectId, updateProjects }) => {
  const removeProject = useCallback(async () => {
    await updateProjects((projectIds) => projectIds.filter((id) => id !== projectId));
  }, [projectId, updateProjects]);

  return (
    <IconButton onClick={removeProject}>
      <Delete />
    </IconButton>
  );
};

export default CvProjectRemoveAction;
