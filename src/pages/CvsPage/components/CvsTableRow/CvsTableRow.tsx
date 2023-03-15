import { FC, ReactNode } from 'react';
import { Checkbox, TableCell, TableRow, Typography } from '@mui/material';
import { ICv } from '@interfaces/ICv';
import { useSkeleton } from '@hooks/index';
import CvsTableRowActions from '../CvsTableRowActions/CvsTableRowActions';

export interface ICvsTableRowProps {
  cv: ICv | null;
  isLoading: boolean;
}

const CvsTableRow: FC<ICvsTableRowProps> = ({ cv, isLoading }) => {
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
        {tryShowCheckbox(cv?.is_template, <Checkbox checked={cv?.is_template} color="primary" />)}
      </TableCell>
      <TableCell>{tryShow(cv?.name, 'text')}</TableCell>
      <TableCell>{tryShow(cv?.description, 'text')}</TableCell>
      <TableCell>{tryShow(cv?.user?.email || '', 'text')}</TableCell>
      <TableCell>
        <div>
          {cv?.projects.map((projectItem, index) => (
            <Typography key={index}>{projectItem.name}</Typography>
          ))}
        </div>
      </TableCell>
      <TableCell>{!isLoading && cv && <CvsTableRowActions cv={cv} />}</TableCell>
    </TableRow>
  );
};

export default CvsTableRow;
