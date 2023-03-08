import { useMemo } from 'react';

export default function useAdaptToSelect<T extends { id: string; name: string }>(
  data: T[] | undefined,
  valueField: keyof T
) {
  const dataToSelect = useMemo(() => {
    return (
      data?.map((item) => ({
        name: item.name,
        id: +item.id,
        value: item[valueField]
      })) ?? []
    );
  }, [data]);

  return dataToSelect;
}
