import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GetProjectQuery } from '@graphql/project/GetProjectQuery';
import { FormEvent, useEffect, useState } from 'react';
import { UpdateProjectMutation } from '@graphql/project/UpdateProjectMutation';
import { IProjectResult } from '@pages/ProjectDetailsPage/ProjectDetailsPage';

const useProjectDetails = () => {
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

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProject({
        variables: {
          id: data?.project?.id,
          project: {
            name: projectName,
            internal_name: internalName,
            description,
            domain: projectDomain,
            start_date: startDate,
            end_date: endDate,
            skillsIds: [],
            team_size: Number(teamSize)
          }
        }
      });
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return {
    handleSubmit,
    data,
    isOpen,
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
    updateProjectError
  };
};

export default useProjectDetails;
