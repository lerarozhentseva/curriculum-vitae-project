import { useCallback, useMemo, useState } from 'react';
import { ISortingRules, SortingOrder } from '@components/AppTable';

export default function useSort<T extends any[]>(
  data: T,
  initialField: keyof T[number]
): [T, ISortingRules<T>, (field: keyof T[number]) => void] {
  const [sortingRules, setSortingRules] = useState<ISortingRules<T>>({
    field: initialField,
    order: SortingOrder.ASC
  });

  const sortedData = useMemo(() => {
    const { field, order } = sortingRules;

    return [...data].sort((a, b) => {
      if (!a[field]) return 1;
      if (!b[field]) return -1;

      const first = a[field] as string;
      const second = b[field] as string;

      return order === SortingOrder.ASC ? first.localeCompare(second) : second.localeCompare(first);
    }) as T;
  }, [data, sortingRules]);

  const cycleSortingRules = useCallback((field: keyof T) => {
    setSortingRules((previous) => ({
      field,
      order: field === previous.field ? (+!previous.order as SortingOrder) : SortingOrder.ASC
    }));
  }, []);

  return [sortedData, sortingRules, cycleSortingRules];
}
