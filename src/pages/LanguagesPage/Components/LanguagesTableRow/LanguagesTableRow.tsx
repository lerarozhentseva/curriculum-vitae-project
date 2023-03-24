import { FC } from 'react';
import { useReactiveVar } from '@apollo/client';
import { Skeleton, TableCell, TableRow } from '@mui/material';
import { ILanguage } from '@interfaces/index';
import { useSkeleton } from '@hooks/index';
import { authService } from '@graphql/auth/authService';
import isAdmin from '@graphql/user/isAdmin';
import LanguagesTableRowActions from '../LanguagesTableRowActions/LanguagesTableRowActions';

export interface ILanguagesTableRowProps {
  language: ILanguage | null;
  isLoading: boolean;
  isLoadingSort: boolean;
}

const LanguagesTableRow: FC<ILanguagesTableRowProps> = ({ language, isLoading, isLoadingSort }) => {
  const tryShow = useSkeleton(isLoading);
  const user = useReactiveVar(authService.user$);

  return (
    <TableRow>
      <TableCell>
        {isLoadingSort ? <Skeleton variant="text" /> : tryShow(language?.name, 'text')}
      </TableCell>
      <TableCell>
        {isLoadingSort ? <Skeleton variant="text" /> : tryShow(language?.iso2, 'text')}
      </TableCell>
      <TableCell>
        {!isLoading && !isLoadingSort && language && isAdmin(user) && (
          <LanguagesTableRowActions language={language} />
        )}
      </TableCell>
    </TableRow>
  );
};

export default LanguagesTableRow;
