import React, { FC } from 'react';
import { Box } from '@mui/material';

interface IDragAndDrop {
  children: JSX.Element | JSX.Element[];
  uploadAvatar: (event: FileList | null) => void;
}

export const DragAndDrop: FC<IDragAndDrop> = ({ children, uploadAvatar }) => {
  const handleDrop = (event: React.DragEvent<Element>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      uploadAvatar(event.dataTransfer.files);
    }
  };

  return <Box onDrop={handleDrop}>{children}</Box>;
};

export default DragAndDrop;
