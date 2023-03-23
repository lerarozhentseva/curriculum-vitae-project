import { ChangeEvent, FC, useCallback, useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { useSkeleton } from '@hooks/index';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@graphql/user/isAdmin';
import { StyledTextField } from '@components/Input';
import { DepartmentsTableRowActions } from '../DepartmentsTableRowActions';
import { IDepartmentsTableRowProps } from '.';

const DepartmentsTableRow: FC<IDepartmentsTableRowProps> = ({ department, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(department?.name ?? '');

  const onNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  );

  const enableEditing = useCallback(() => {
    setIsEditing(true);
    setName(department?.name ?? '');
  }, [department]);

  const disableEditing = useCallback(() => setIsEditing(false), []);

  const tryShow = useSkeleton(isLoading);
  const user = useReactiveVar(authService.user$);

  return (
    <TableRow>
      <TableCell>
        {tryShow(
          isEditing ? (
            <StyledTextField type="text" size="small" value={name} onChange={onNameChange} />
          ) : (
            department?.name
          ),
          'text'
        )}
      </TableCell>
      <TableCell>
        {!isLoading && department && isAdmin(user) && (
          <DepartmentsTableRowActions
            department={department}
            isEditing={isEditing}
            name={name}
            enableEditing={enableEditing}
            disableEditing={disableEditing}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default DepartmentsTableRow;
