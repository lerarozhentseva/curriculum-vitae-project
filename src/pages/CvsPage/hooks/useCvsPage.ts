import { useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useCompoundError, useFilter } from '@hooks/index';
import { authService } from '@graphql/auth/authService';
import { ICv } from '@interfaces/ICv';
import { CvsQuery } from '@graphql/cvs/CvsQuery';

const useCvsPage = () => {
  const { data, loading, error: nativeError, refetch } = useQuery<{ cvs: ICv[] }>(CvsQuery);

  const cvs: ICv[] =
    data?.cvs.map((cv) => ({
      ...cv
    })) ?? [];

  const [filteredProjects, query, onQueryChange] = useFilter(cvs, 'name', 'description');
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
    loading,
    error,
    refetch,
    filteredProjects,
    query,
    onQueryChange,
    user,
    isOpen,
    handleClickClose,
    setIsOpen,
    handleClickOpen,
    clearError
  };
};

export default useCvsPage;
