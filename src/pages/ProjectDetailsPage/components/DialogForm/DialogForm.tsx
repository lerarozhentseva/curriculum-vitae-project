import React, { FC, FormEvent, useRef } from 'react';
import { DialogContent, DialogTitle } from '@mui/material';
import { UncontrolledTextField } from '@components/Input';
import useUpdateProject from '@pages/ProjectDetailsPage/hooks/useUpdateProject';
import {
  StyledDialog,
  StyledDateBox,
  StyledBox,
  StyledButton
} from '@pages/ProjectDetailsPage/components/DialogForm/DialogForm.styles';
import DateInput from '@components/DateInput/DateInput';
import { NotificationAlert } from '@components/NotificationAlert';

interface DialogFormProps {
  isOpen: boolean;
  handleClickClose: () => void;
}

const DialogForm: FC<DialogFormProps> = ({ isOpen, handleClickClose }) => {
  const { updateProject, updateProjectError, setIsOpen, data } = useUpdateProject();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const project = {
      name: formData.get('projectName') as string,
      internal_name: formData.get('internalName') as string,
      description: formData.get('description') as string,
      domain: formData.get('domain') as string,
      start_date: formData.get('startDate') as string,
      end_date: formData.get('endDate') as string,
      team_size: Number(formData.get('teamSize')),
      skillsIds: []
    };

    try {
      await updateProject({
        variables: {
          id: data?.project?.id,
          project
        }
      });
      handleClickClose();
    } catch {
      setIsOpen(true);
    }
  };

  return (
    <StyledDialog onClose={handleClickClose} open={isOpen}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} ref={formRef}>
          <UncontrolledTextField
            label="Project Name"
            name="projectName"
            defaultValue={data?.project?.name || ''}
          />
          <UncontrolledTextField
            label="Internal Name"
            name="internalName"
            defaultValue={data?.project?.internal_name || ''}
          />
          <UncontrolledTextField
            label="Description"
            name="description"
            defaultValue={data?.project?.description || ''}
          />
          <UncontrolledTextField
            label="Project Domain"
            defaultValue={data?.project?.domain || ''}
            name="domain"
          />
          <UncontrolledTextField
            label="Team Size"
            defaultValue={data?.project?.team_size || ''}
            name="teamSize"
          />
          <StyledDateBox>
            <DateInput
              name="startDate"
              label="Start date"
              defaultValue={data?.project?.start_date || ''}
            />
            <DateInput
              name="endDate"
              label="End date"
              defaultValue={data?.project?.end_date || ''}
            />
          </StyledDateBox>
          <StyledBox>
            <StyledButton variant="contained" color="primary" onClick={handleClickClose}>
              Cancel
            </StyledButton>
            <StyledButton sx={{ ml: '30px' }} variant="contained" color="secondary" type="submit">
              Edit
            </StyledButton>
          </StyledBox>
        </form>
        {updateProjectError && (
          <NotificationAlert
            severity="error"
            text={'Something went wrong'}
            sx={{ width: '200px', m: '10px 0' }}
          />
        )}
      </DialogContent>
    </StyledDialog>
  );
};
export default DialogForm;
