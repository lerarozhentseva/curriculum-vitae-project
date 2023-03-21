import { FC } from 'react';
import { DeleteForever } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ConfirmationDialog } from '@components/Dialog';
import { useDisclosure } from '@hooks/index';
import { Toast } from '@components/Toast';
import { IPosition } from '@interfaces/index';
import useDeletePosition from '../../hooks/useDeletePosition';

export interface IDeletePositionComponentProps {
  position: IPosition;
}

const DeletePositionComponent: FC<IDeletePositionComponentProps> = ({ position }) => {
  const { loading, error, clearError, deletePositionRequest } = useDeletePosition(position);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <IconButton onClick={onOpen}>
        <DeleteForever />
      </IconButton>
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        isLoading={loading}
        action={deletePositionRequest}
        message={`Are you sure you want to delete position "${position.name}"?`}
      />
    </>
  );
};

export default DeletePositionComponent;
