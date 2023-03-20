import { ChangeEvent, useCallback, useState } from 'react';

function useDerivedMap<T extends any[], K = string>(
  data: T,
  keyField: keyof T[number],
  valueField: keyof T[number],
  fallback: K,
  nativeChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void
): [
  { [x: string]: K },
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLInputElement>, field: string) => void
] {
  const [map, setMap] = useState(() => {
    const toPopulate: { [x: string]: K } = {};
    for (let i = 0; i < data?.length; i++) {
      toPopulate[data[i][keyField]] = data[i][valueField];
    }
    return toPopulate;
  });

  const onMapChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value: string[] =
        typeof e.target.value === 'string' ? [e.target.value] : e.target.value;
      const added = value.find((item) => !(item in map));
      if (added) setMap({ ...map, [added]: fallback });

      nativeChangeHandler?.(e);
    },
    [map, nativeChangeHandler]
  );

  const onMapFieldChange = useCallback((e: ChangeEvent<HTMLInputElement>, field: string) => {
    setMap((previous) => ({
      ...previous,
      [field]: e.target.value as K
    }));
  }, []);

  return [map, onMapChange, onMapFieldChange];
}

export default useDerivedMap;
