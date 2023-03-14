import { ReactNode } from 'react';

export interface IConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  action: () => Promise<void>;
  isLoading: boolean;
  message: ReactNode;
}
