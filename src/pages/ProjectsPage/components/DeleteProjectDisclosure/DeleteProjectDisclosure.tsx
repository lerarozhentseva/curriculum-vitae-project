import { FC, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { DeleteForever } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ConfirmationDialog } from '@components/Dialog';
import {
  DeleteProjectMutation,
  GetProjectsQuery,
  IDeleteProjectMutationParameters,
  IDeleteProjectMutationReturnValue
} from '@graphql/projects';
import { useDisclosure, useRequest } from '@hooks/index';
import { Toast } from '@components/Toast';
import { IDeleteProjectDisclosureProps } from '.';

const DeleteProjectDisclosure: FC<IDeleteProjectDisclosureProps> = ({ project }) => {
  const [deleteAction, { loading, error: nativeError }] = useMutation<
    IDeleteProjectMutationReturnValue,
    IDeleteProjectMutationParameters
  >(DeleteProjectMutation, {
    refetchQueries: [{ query: GetProjectsQuery }, 'GetProjects']
  });

  const deleteProject = useCallback(async () => {
    await deleteAction({ variables: { id: project.id } });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteProjectRequest, error, clearError] = useRequest(deleteProject, nativeError);

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
        action={deleteProjectRequest}
        message={`Are you sure you want to delete project "${project.name}"?`}
      />
    </>
  );
};

export default DeleteProjectDisclosure;
