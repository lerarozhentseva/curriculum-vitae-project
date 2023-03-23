import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useRequest } from '@hooks/index';
import { IPosition } from '@interfaces/index';
import {
  DeletePositionMutation,
  IDeletePositionMutationParameters,
  IDeletePositionMutationReturnValue
} from '@graphql/positions/DeletePositionMutation';
import { GetPositionsQuery } from '@graphql/positions';

const useDeletePosition = (position: IPosition) => {
  const [deleteAction, { loading, error: nativeError }] = useMutation<
    IDeletePositionMutationReturnValue,
    IDeletePositionMutationParameters
  >(DeletePositionMutation, {
    refetchQueries: [{ query: GetPositionsQuery }]
  });

  const deletePosition = useCallback(async () => {
    await deleteAction({ variables: { id: position.id } });
  }, []);

  const [deletePositionRequest, error, clearError] = useRequest(deletePosition, nativeError);

  return {
    loading,
    error,
    clearError,
    deletePositionRequest
  };
};

export default useDeletePosition;
