import { ReactNode, useCallback } from 'react';
import { Skeleton, SkeletonProps } from '@mui/material';

const useSkeleton = (isLoading: boolean) => {
  return useCallback(
    (data: ReactNode | undefined, variant: SkeletonProps['variant']) => {
      if (isLoading) return <Skeleton variant={variant}>{data}</Skeleton>;
      return data;
    },
    [isLoading]
  );
};

export default useSkeleton;
