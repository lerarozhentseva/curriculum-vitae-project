import { useReactiveVar } from '@apollo/client';
import { OpenInFull } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ICv } from '@interfaces/ICv';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@graphql/user/isAdmin';
import DeleteCvComponent from '../DeleteCvComponent/DeleteCvComponent';

interface ICvsTableRowActionsProps {
  cv: ICv;
}

function CvsTableRowActions({ cv }: ICvsTableRowActionsProps) {
  const user = useReactiveVar(authService.user$);
  const navigate = useNavigate();

  const toCvDetails = () => {
    navigate(`/cvs/${cv.id}/details`);
  };

  return (
    <>
      <IconButton onClick={toCvDetails}>
        <OpenInFull />
      </IconButton>
      {(isAdmin(user) || cv?.user?.id === user?.id) && <DeleteCvComponent cv={cv} />}
    </>
  );
}

export default CvsTableRowActions;
