import { FC, FormEvent, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { UncontrolledTextField } from '@components/Input';
import { NotificationAlert } from '@components/NotificationAlert';
import { IPosition } from '@interfaces/index';
import usePositionsPage from '@pages/PositionPage/hooks/usePositionsPage';
import { CreatePositionMutation } from '@graphql/positions/CreatePositionMutation';
import { UpdatePositionMutation } from '@graphql/positions/UpdatePositionMutation';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  position?: IPosition;
}

export interface IPositionsCreateResult {
  createPosition: IPosition;
}

export interface IPositionsUpdateResult {
  updatePosition: IPosition;
}

const PositionFormDialog: FC<Props> = ({ isOpen, handleClose, position }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [createPosition, { error: errorPositionCreate }] = useMutation<IPositionsCreateResult>(
    CreatePositionMutation
  );
  const [updatePosition, { error: errorPositionUpdate }] = useMutation<IPositionsUpdateResult>(
    UpdatePositionMutation
  );

  const { refetch, setIsOpen } = usePositionsPage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const positionResult = {
      name: formData.get('posName') as string
    };

    try {
      if (position) {
        await updatePosition({
          variables: {
            id: position.id,
            position: positionResult
          }
        });
      } else {
        await createPosition({
          variables: {
            position: positionResult
          }
        });
      }
      refetch();
      handleClose();
    } catch {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{position ? 'Update Position' : 'Create Position'}</DialogTitle>
      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <UncontrolledTextField
            defaultValue={position?.name || ''}
            name="posName"
            label="Position Name"
            sx={{ mb: 2 }}
          />
          <Button type="button" onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="outlined" sx={{ ml: 2 }}>
            {position ? 'Update' : 'Create'}
          </Button>
          {errorPositionCreate && (
            <NotificationAlert text={'Something went wrong!'} severity={'error'} sx={{ mt: 2 }} />
          )}
          {errorPositionUpdate && (
            <NotificationAlert
              text={'Something went wrong while updating!'}
              severity={'error'}
              sx={{ mt: 2 }}
            />
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PositionFormDialog;
