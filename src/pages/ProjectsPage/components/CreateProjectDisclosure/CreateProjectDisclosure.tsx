import { useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { InputDateField, InputTextField } from '@components/Input';
import { Toast } from '@components/Toast';
import { ICreateProjectFormData } from '@graphql/interfaces';
import {
  CreateProjectMutation,
  GetProjectsQuery,
  ICreateProjectMutationParameters,
  ICreateProjectMutationReturnValue
} from '@graphql/projects';
import { useRequest, useNestedFormData, useDisclosure } from '@hooks/index';
import { EmployeeCreationModalButton } from '@components/Button';

const CreateProjectDisclosure = () => {
  const { formData, onFormFieldChange, resetFormData } = useNestedFormData<ICreateProjectFormData>({
    name: '',
    internal_name: '',
    description: '',
    domain: '',
    team_size: 0,
    skillsIds: [],
    start_date: '',
    end_date: ''
  });
  const [createAction, { loading: isLoading, error: nativeError }] = useMutation<
    ICreateProjectMutationReturnValue,
    ICreateProjectMutationParameters
  >(CreateProjectMutation, { refetchQueries: [{ query: GetProjectsQuery }, 'GetProjects'] });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const createProject = useCallback(async () => {
    const project: typeof formData = {
      ...formData,
      team_size: +formData.team_size,
      end_date: formData.end_date || null
    };

    await createAction({ variables: { project } });
    resetFormData();
    onClose();
  }, [formData]);

  const [createProjectRequest, error, clearError] = useRequest(createProject, nativeError);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <EmployeeCreationModalButton onClick={onOpen}>Create Project</EmployeeCreationModalButton>
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
        {isLoading && <LinearProgress />}
        <DialogTitle textAlign="center">Create Project</DialogTitle>
        <DialogContent>
          <InputTextField
            value={formData.name}
            onChange={onFormFieldChange}
            name="name"
            inputType="text"
            label="Name"
          />
          <InputTextField
            value={formData.internal_name}
            onChange={onFormFieldChange}
            name="internal_name"
            inputType="text"
            label="Internal name"
          />
          <InputTextField
            value={formData.description}
            onChange={onFormFieldChange}
            name="description"
            inputType="text"
            label="Description"
          />
          <InputTextField
            value={formData.domain}
            onChange={onFormFieldChange}
            name="domain"
            inputType="text"
            label="Domain"
          />
          <InputDateField
            value={formData.start_date}
            onChange={onFormFieldChange}
            name="start_date"
            label="Start"
          />
          <InputDateField
            value={formData.end_date}
            onChange={onFormFieldChange}
            name="end_date"
            label="End"
          />
          <InputTextField
            value={'' + formData.team_size}
            onChange={onFormFieldChange}
            name="team_size"
            inputType="number"
            label="Team size"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={createProjectRequest}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateProjectDisclosure;
