import { FormEvent, useEffect, useState } from 'react';
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

  const [projectName, setProjectName] = useState<string>(data?.project?.name || '');
  const [internalName, setInternalName] = useState<string>(data?.project?.internal_name || '');
  const [description, setDescription] = useState<string>(data?.project?.description || '');
  const [projectDomain, setProjectDomain] = useState<string>(data?.project?.domain || '');
  const [startDate, setStartDate] = useState<string>(data?.project?.start_date || '');
  const [endDate, setEndDate] = useState<string>(data?.project?.end_date || '');
  const [teamSize, setTeamSize] = useState<string>(
    data?.project?.team_size !== undefined ? data.project.team_size.toString() : ''
  );

  useEffect(() => {
    setProjectName(data?.project?.name || '');
    setInternalName(data?.project?.internal_name || '');
    setDescription(data?.project?.description || '');
    setProjectDomain(data?.project?.domain || '');
    setStartDate(data?.project?.start_date || '');
    setEndDate(data?.project?.end_date || '');
    setTeamSize(data?.project?.team_size.toString() || '');
  }, [data]);

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
    projectName,
    setProjectName,
    internalName,
    setInternalName,
    description,
    setDescription,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    projectDomain,
    setProjectDomain,
    teamSize,
    setTeamSize,
    updateProject,
    updateProjectLoading,
    updateProjectError,
    userIsAdmin
  };
};

export default useUpdateProject;
