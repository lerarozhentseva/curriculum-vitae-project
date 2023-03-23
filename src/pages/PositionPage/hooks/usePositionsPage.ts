import { useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useCompoundError, useFilter } from '@hooks/index';
import { authService } from '@graphql/auth/authService';
import { IPosition } from '@interfaces/index';
import { GetPositionsQuery } from '@graphql/positions';

const usePositionsPage = () => {
  const { data, loading, error: nativeError, refetch } = useQuery<{ positions: IPosition[] }>(
    GetPositionsQuery
  );

  const positions: IPosition[] =
    data?.positions.map((position) => ({
      ...position
    })) ?? [];

  const [filteredPositions, query, onQueryChange] = useFilter(positions, 'name');
  const { error, clearError } = useCompoundError(nativeError);
  const user = useReactiveVar(authService.user$);

  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  return {
    positions,
    loading,
    error,
    refetch,
    query,
    onQueryChange,
    user,
    isOpen,
    handleClickClose,
    setIsOpen,
    handleClickOpen,
    clearError,
    filteredPositions
  };
};

export default usePositionsPage;
