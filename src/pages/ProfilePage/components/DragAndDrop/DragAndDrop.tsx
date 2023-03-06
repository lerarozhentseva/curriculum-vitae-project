import React, { FC, useEffect } from 'react';
import { StyledDragAndDropBox } from '@pages/ProfilePage/components/DragAndDrop/DragAndDrop.style';

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

  return <StyledDragAndDropBox onDrop={handleDrop}>{children}</StyledDragAndDropBox>;
};

export default DragAndDrop;
