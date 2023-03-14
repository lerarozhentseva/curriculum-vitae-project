import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GetProjectQuery } from '@graphql/project/GetProjectQuery';
import { UpdateProjectMutation } from '@graphql/project/UpdateProjectMutation';
import { IProjectResult } from '@pages/ProjectDetailsPage/ProjectDetailsPage';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@graphql/user/isAdmin';

const useUpdateProject = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery<IProjectResult>(GetProjectQuery, {
    variables: { id }
  });

  const [updateProject, { loading: updateProjectLoading, error: updateProjectError }] = useMutation<
    IProjectResult
  >(UpdateProjectMutation);

  const user = useReactiveVar(authService.user$);
  const userIsAdmin = isAdmin(user);

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  return {
    data,
    isOpen,
    setIsOpen,
    handleClickOpen,
    handleClickClose,
    loading,
    error,
    updateProject,
    updateProjectLoading,
    updateProjectError,
    userIsAdmin
  };
};

export default useUpdateProject;
