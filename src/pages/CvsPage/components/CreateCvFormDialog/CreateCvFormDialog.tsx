import { FC, FormEvent, useRef } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import { CreateCvMutation } from '@graphql/cvs/CreateCvMutation';
import useCvsPage from '@pages/CvsPage/hooks/useCvsPage';
import { ICvsCreateResult } from '@pages/CvsPage/CvsPage';
import { UncontrolledTextField } from '@components/Input';
import { NotificationAlert } from '@components/NotificationAlert';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const CreateCvFormDialog: FC<Props> = ({ isOpen, handleClose }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [createCV, { error: errorCv }] = useMutation<ICvsCreateResult>(CreateCvMutation);

  const { refetch, user, setIsOpen } = useCvsPage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isTemplateChecked = formData.get('cvTemplate') === 'on';
    const cv = {
      name: formData.get('cvName') as string,
      description: formData.get('cvDescription') as string,
      skills: [],
      userId: user?.id,
      projectsIds: [],
      languages: [],
      is_template: isTemplateChecked
    };

    try {
      if (cv.name && cv.description) {
        const resp = await createCV({
          variables: {
            cv
          }
        });
        refetch();
        handleClose();
      } else {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Create Cv</DialogTitle>
      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <UncontrolledTextField defaultValue="" name="cvName" label="Cv Name" />
          <UncontrolledTextField defaultValue="" name="cvDescription" label="Cv Description" />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="cvTemplate" />}
              label="Cv Template"
              labelPlacement="start"
            />
          </FormGroup>
          <Button type="button" onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="outlined" sx={{ ml: 2 }}>
            Create
          </Button>
          {errorCv && (
            <NotificationAlert text={'Something went wrong!'} severity={'error'} sx={{ mt: 2 }} />
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCvFormDialog;
