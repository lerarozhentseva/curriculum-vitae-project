import { ChangeEvent, FC, FormEvent } from 'react';
import { DialogContent, DialogTitle } from '@mui/material';
import { InputTextField } from '@components/Input';
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
  const {
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
    updateProjectError,
    setIsOpen,
    data
  } = useUpdateProject();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(11);
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
      handleClickClose();
    } catch {
      setIsOpen(true);
    }
  };

  return (
    <StyledDialog onClose={handleClickClose} open={isOpen}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <InputTextField
            inputType="text"
            onChange={(e) => setProjectName(e.target.value)}
            name="Project Name"
            value={projectName}
          />
          <InputTextField
            inputType="text"
            onChange={(e) => setInternalName(e.target.value)}
            name="Internal Name"
            value={internalName}
          />
          <InputTextField
            inputType="text"
            onChange={(e) => setDescription(e.target.value)}
            name="Description"
            value={description}
          />
          <InputTextField
            inputType="text"
            onChange={(e) => setProjectDomain(e.target.value)}
            name="Domain"
            value={projectDomain}
          />
          <InputTextField
            inputType="text"
            onChange={(e) => setTeamSize(e.target.value)}
            name="Team Size"
            value={teamSize}
          />
          <StyledDateBox>
            <DateInput
              label="Start date"
              value={startDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setStartDate(e.target.value);
              }}
            />
            <DateInput
              label="End date"
              value={endDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEndDate(e.target.value);
              }}
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
