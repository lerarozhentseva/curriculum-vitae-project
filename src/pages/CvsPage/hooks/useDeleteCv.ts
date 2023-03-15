import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useRequest } from '@hooks/index';
import {
  DeleteCvMutation,
  IDeleteCvMutationParameters,
  IDeleteCvMutationReturnValue
} from '@graphql/cvs/DeleteCvMutation';
import { CvsQuery } from '@graphql/cvs/CvsQuery';
import { ICv } from '@interfaces/ICv';

const useDeleteCv = (cv: ICv) => {
  const [deleteAction, { loading, error: nativeError }] = useMutation<
    IDeleteCvMutationReturnValue,
    IDeleteCvMutationParameters
  >(DeleteCvMutation, {
    refetchQueries: [{ query: CvsQuery }]
  });

  const deleteCv = useCallback(async () => {
    await deleteAction({ variables: { id: cv.id } });
  }, []);

  const [deleteCvRequest, error, clearError] = useRequest(deleteCv, nativeError);

  return {
    loading,
    error,
    clearError,
    deleteCvRequest
  };
};

export default useDeleteCv;
