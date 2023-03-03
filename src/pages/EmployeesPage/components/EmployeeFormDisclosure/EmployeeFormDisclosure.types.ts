import { ChangeEvent, ReactNode } from 'react';
import { IUpdateUserFormData } from '@graphql/interfaces/IUpdateUserFormData';

export interface IEmployeeFormDisclosureProps<T extends IUpdateUserFormData> {
  action: () => Promise<void>;
  actionName: string;
  formData: T;
  onFormFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  nativeError: Error | null | undefined;
  isOpen: boolean;
  onClose: () => void;
}
