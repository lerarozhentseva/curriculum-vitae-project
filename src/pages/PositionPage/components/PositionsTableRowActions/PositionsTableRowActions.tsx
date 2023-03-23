import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { IPosition } from '@interfaces/index';
import DeletePositionComponent from '../DeletePositionComponent/DeletePositionComponent';
import usePositionsPage from '../../hooks/usePositionsPage';
import PositionFormDialog from '../PositionFormDialog/PositionFormDialog';

interface IPositionsTableRowActionsProps {
  position: IPosition;
}

function PositionsTableRowActions({ position }: IPositionsTableRowActionsProps) {
  const { isOpen, handleClickOpen, handleClickClose } = usePositionsPage();
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <PositionFormDialog isOpen={isOpen} handleClose={handleClickClose} position={position} />
      <DeletePositionComponent position={position} />
    </>
  );
}

export default PositionsTableRowActions;
