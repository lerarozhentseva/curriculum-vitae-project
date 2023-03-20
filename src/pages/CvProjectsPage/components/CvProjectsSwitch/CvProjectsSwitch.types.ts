import { ChangeEvent } from 'react';

export interface ICvProjectsSwitchProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
