import { FC } from 'react';
import { useReactiveVar } from '@apollo/client';
import { Skeleton, TableCell, TableRow } from '@mui/material';
import { IPosition } from '@interfaces/index';
import { useSkeleton } from '@hooks/index';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@graphql/user/isAdmin';
import PositionsTableRowActions from '../PositionsTableRowActions/PositionsTableRowActions';

export interface IPositionsTableRowProps {
  position: IPosition | null;
  isLoading: boolean;
  isLoadingSort: boolean;
}

const PositionsTableRow: FC<IPositionsTableRowProps> = ({ position, isLoading, isLoadingSort }) => {
  const tryShow = useSkeleton(isLoading);
  const user = useReactiveVar(authService.user$);

  return (
    <TableRow>
      <TableCell>
        {isLoadingSort ? <Skeleton variant="text" /> : tryShow(position?.name, 'text')}
      </TableCell>
      <TableCell>
        {!isLoading && !isLoadingSort && position && isAdmin(user) && (
          <PositionsTableRowActions position={position} />
        )}
      </TableCell>
    </TableRow>
  );
};

export default PositionsTableRow;
