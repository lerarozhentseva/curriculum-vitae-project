import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress
} from '@mui/material';
import { IConfirmationDialogProps } from '.';

const ConfirmationDialog: FC<IConfirmationDialogProps> = ({
  isOpen,
  onClose,
  action,
  isLoading,
  message
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {isLoading && <LinearProgress />}
      <DialogTitle>Confirm action</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          No
        </Button>
        <Button onClick={action}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
