import { ChangeEvent } from 'react';

export interface IFilterProps {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
