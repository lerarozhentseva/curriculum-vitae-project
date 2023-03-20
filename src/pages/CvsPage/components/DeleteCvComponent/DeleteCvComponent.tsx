import { FC } from 'react';
import { DeleteForever } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ConfirmationDialog } from '@components/Dialog';
import { useDisclosure } from '@hooks/index';
import { Toast } from '@components/Toast';
import { ICv } from '@interfaces/ICv';
import useDeleteCv from '@pages/CvsPage/hooks/useDeleteCv';

export interface IDeleteCvComponentProps {
  cv: ICv;
}

const DeleteCvComponent: FC<IDeleteCvComponentProps> = ({ cv }) => {
  const { loading, error, clearError, deleteCvRequest } = useDeleteCv(cv);
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
        action={deleteCvRequest}
        message={`Are you sure you want to delete cv "${cv.name}"?`}
      />
    </>
  );
};

export default DeleteCvComponent;
