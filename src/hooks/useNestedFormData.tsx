import { ChangeEvent, useCallback, useState } from 'react';

export default function useNestedFormData<T extends { [x: string]: any }>(data: T) {
  const [formData, setFormData] = useState(structuredClone(data));

  const onFormFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const dummy = { ...formData };
      const fields = e.target.name.split('.');
      let node: any = dummy;

      for (let i = 0; i < fields.length - 1; i++) node = node[fields[i]];
      node[fields[fields.length - 1]] = e.target.value;

      setFormData(dummy);
    },
    [formData]
  );

  const resetFormData = useCallback(() => {
    setFormData(structuredClone(data));
  }, []);

  return {
    formData,
    onFormFieldChange,
    resetFormData
  };
}
