import { useCallback, useEffect, useState } from 'react';

const useCompoundError = (nativeError: Error | null | undefined) => {
  const [error, setError] = useState('');

  const raiseError = useCallback((message: string) => {
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  useEffect(() => {
    if (nativeError) raiseError(nativeError.message);
  }, [nativeError]);

  return {
    error,
    raiseError,
    clearError
  };
};

export default useCompoundError;
