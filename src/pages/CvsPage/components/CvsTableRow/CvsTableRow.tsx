import { FC, ReactNode } from 'react';
import { Checkbox, Skeleton, TableCell, TableRow, Typography } from '@mui/material';
import { ICv } from '@interfaces/ICv';
import { useSkeleton } from '@hooks/index';
import CvsTableRowActions from '../CvsTableRowActions/CvsTableRowActions';

export interface ICvsTableRowProps {
  cv: ICv | null;
  isLoading: boolean;
  isLoadingSort: boolean;
}

const CvsTableRow: FC<ICvsTableRowProps> = ({ cv, isLoading, isLoadingSort }) => {
  const tryShow = useSkeleton(isLoading);

  const tryShowCheckbox = (condition: boolean | undefined, content: ReactNode): ReactNode => {
    if (isLoading) {
      return tryShow(cv?.is_template, 'text');
    }
    return condition ? <Checkbox checked color="primary" /> : content;
  };

  return (
    <TableRow>
      <TableCell>
        {isLoadingSort ? (
          <Skeleton variant="text" />
        ) : (
          tryShowCheckbox(cv?.is_template, <Checkbox checked={cv?.is_template} color="primary" />)
        )}
      </TableCell>
      <TableCell>
        {isLoadingSort ? <Skeleton variant="text" /> : tryShow(cv?.name, 'text')}
      </TableCell>
      <TableCell>
        {isLoadingSort ? <Skeleton variant="text" /> : tryShow(cv?.description, 'text')}
      </TableCell>
      <TableCell>
        {isLoadingSort ? <Skeleton variant="text" /> : tryShow(cv?.user?.email || '', 'text')}
      </TableCell>
      <TableCell>
        <div>
          {isLoadingSort ? (
            <Skeleton variant="text" />
          ) : (
            cv?.projects.map((projectItem, index) => (
              <Typography key={index}>{projectItem.name}</Typography>
            ))
          )}
        </div>
      </TableCell>
      <TableCell>{!isLoading && cv && <CvsTableRowActions cv={cv} />}</TableCell>
    </TableRow>
  );
};

export default CvsTableRow;
