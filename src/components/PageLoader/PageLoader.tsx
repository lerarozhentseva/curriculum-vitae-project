import { FC } from 'react';
import { CircularProgress } from '@mui/material';
import { StyledLoaderBox } from './PageLoader.styles';

const PageLoader: FC = () => {
  return (
    <StyledLoaderBox>
      <CircularProgress />
    </StyledLoaderBox>
  );
};

export default PageLoader;
