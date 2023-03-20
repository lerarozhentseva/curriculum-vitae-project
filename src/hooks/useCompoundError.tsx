import { useCallback, useEffect, useState } from 'react';

const useCompoundError = (...nativeErrors: (Error | null | undefined)[]) => {
  const [error, setError] = useState('');

  const raiseError = useCallback((message: string) => {
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  useEffect(() => {
    const messages: string[] = [];
    for (let i = 0; i < nativeErrors.length; i++) {
      if (nativeErrors[i]) messages.push(nativeErrors[i]?.message ?? '');
    }
    raiseError(messages.join('\n'));
  }, [...nativeErrors]);

  return {
    error,
    raiseError,
    clearError
  };
};

export default useCompoundError;
