import { FC } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { InputTextField } from '@components/Input';
import useProjectDetails from '@pages/ProjectDetailsPage/hooks/useProjectDetails';

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
    handleSubmit
  } = useProjectDetails();

  return (
    <Dialog
      onClose={handleClickClose}
      open={isOpen}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '15px' }}>
            <TextField
              id="date"
              label="Start date"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="date"
              label="End date"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              sx={{ width: 220, ml: '50px' }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Box>
          <Box sx={{ mt: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{ width: '150px', height: '30px' }}
              variant="contained"
              color="primary"
              onClick={handleClickClose}
            >
              Cancel
            </Button>
            <Button
              sx={{ width: '150px', height: '30px', ml: '30px' }}
              variant="contained"
              color="secondary"
              type="submit"
              onClick={handleClickClose}
            >
              Edit
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
