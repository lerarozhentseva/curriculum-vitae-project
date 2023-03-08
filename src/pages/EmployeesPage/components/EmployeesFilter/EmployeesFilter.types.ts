import { ChangeEvent } from 'react';

export interface IEmployeesFilterProps {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
