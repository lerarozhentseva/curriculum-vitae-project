import useCompoundError from './useCompoundError';

export default function useRequest<T extends any[]>(
  action: (...args: T) => Promise<void>,
  nativeError?: Error | null | undefined
): [(...args: T) => Promise<void>, string, () => void] {
  const { error, raiseError, clearError } = useCompoundError(nativeError);

  const request = async (...args: T) => {
    try {
      await action(...args);
    } catch (e) {
      if (e instanceof Error) {
        raiseError(e.message);
      } else {
        raiseError('' + e);
      }
    }
  };

  return [request, error, clearError];
}
