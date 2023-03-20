import { ChangeEvent, useCallback, useMemo, useState } from 'react';
//import { debounce } from 'lodash';
import useDebounce from '@hooks/useDebounce';

export default function useFilter<T extends any[]>(
  data: T,
  field: keyof T[number],
  fallback?: keyof T[number]
): [T, keyof T[number], (e: ChangeEvent<HTMLInputElement>) => void] {
  const [query, setQuery] = useState('');

  // const debouncedSetQuery = useCallback(
  //   debounce((value: string) => {
  //     setQuery(value);
  //   }, 250),
  //   []
  // );
  //
  // const onQueryChange = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     debouncedSetQuery(e.target.value);
  //   },
  //   [debouncedSetQuery]
  // );

  const debQuery = useDebounce(query, 800);

  const onQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const filteredData = useMemo(() => {
    if (!debQuery) return data;

    let filtered = data.filter((item) => item[field]?.includes(debQuery));
    if (!filtered.length && fallback)
      filtered = data.filter((item) => item[fallback]?.includes(debQuery));

    return filtered as T;
  }, [data, debQuery]);

  return [filteredData, query, onQueryChange];
}
