import { ChangeEvent } from 'react';
import { InputSelectProps } from '@components/Input/InputSelectField';

export interface ICvMasterySectionProps {
  chosen: string[];
  options: InputSelectProps['data'];
  onChoiceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMasteryChange: (e: ChangeEvent<HTMLInputElement>, field: string) => void;
  masteryMap: { [x: string]: string };
  masteryLevels: string[];
  selectName: string;
  selectLabel: string;
}
