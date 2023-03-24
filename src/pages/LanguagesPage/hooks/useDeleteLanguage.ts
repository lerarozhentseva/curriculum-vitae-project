import { useMutation } from '@apollo/client';
import { useRequest } from '@hooks/index';
import { ILanguage } from '@interfaces/index';
import { DeleteLanguageMutation } from '@graphql/languages/DeleteLanguageMutation';
import { GetLanguagesQuery } from '@graphql/languages';

const useDeleteLanguage = (language: ILanguage) => {
  const [deleteLanguage, { loading, error: nativeError }] = useMutation<{ affected: number }>(
    DeleteLanguageMutation,
    {
      refetchQueries: [{ query: GetLanguagesQuery }]
    }
  );

  const handleDelete = async () => {
    await deleteLanguage({
      variables: { id: language.id }
    });
  };

  const [deleteLanguageRequest, error, clearError] = useRequest(handleDelete, nativeError);

  return {
    loading,
    error,
    clearError,
    deleteLanguageRequest
  };
};

export default useDeleteLanguage;
