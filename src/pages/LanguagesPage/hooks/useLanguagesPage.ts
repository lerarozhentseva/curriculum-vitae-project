import { useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useCompoundError, useFilter } from '@hooks/index';
import { authService } from '@graphql/auth/authService';
import { ILanguage } from '@interfaces/index';
import { GetLanguagesQuery } from '@graphql/languages';

const useLanguagesPage = () => {
  const { data, loading, error: nativeError, refetch } = useQuery<{ languages: ILanguage[] }>(
    GetLanguagesQuery
  );

  const languages: ILanguage[] =
    data?.languages.map((language) => ({
      ...language
    })) ?? [];

  const [filteredLanguages, query, onQueryChange] = useFilter(languages, 'name');
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
    languages,
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
    filteredLanguages
  };
};

export default useLanguagesPage;
