import { FC } from 'react';
import { DeleteForever } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ConfirmationDialog } from '@components/Dialog';
import { useDisclosure } from '@hooks/index';
import { Toast } from '@components/Toast';
import { ILanguage } from '@interfaces/index';
import useDeleteLanguage from '../../hooks/useDeleteLanguage';

export interface IDeleteLanguageProps {
  language: ILanguage;
}

const DeleteLanguageComponent: FC<IDeleteLanguageProps> = ({ language }) => {
  const { loading, error, clearError, deleteLanguageRequest } = useDeleteLanguage(language);
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
        action={deleteLanguageRequest}
        message={`Are you sure you want to delete language "${language.name}"?`}
      />
    </>
  );
};

export default DeleteLanguageComponent;
