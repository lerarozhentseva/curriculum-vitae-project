import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';

export default function useFilter<T extends any[]>(
  data: T,
  field: keyof T[number],
  fallback?: keyof T[number]
): [T, keyof T[number], (e: ChangeEvent<HTMLInputElement>) => void] {
  const [query, setQuery] = useState('');

  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 250),
    []
  );

  const onQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debouncedSetQuery(e.target.value);
    },
    [debouncedSetQuery]
  );

  const filteredData = useMemo(() => {
    if (!query) return data;

    let filtered = data.filter((item) => item[field]?.includes(query));
    if (!filtered.length && fallback)
      filtered = data.filter((item) => item[fallback]?.includes(query));

    return filtered as T;
  }, [data, query]);

  return [filteredData, query, onQueryChange];
}
