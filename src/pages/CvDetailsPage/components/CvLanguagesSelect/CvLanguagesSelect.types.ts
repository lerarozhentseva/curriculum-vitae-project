import { ICvMasterySectionProps } from '@pages/CvDetailsPage/components/CvMasterySection';

export type ICvLanguagesSelectProps = Omit<
  ICvMasterySectionProps,
  'options' | 'selectLabel' | 'selectName' | 'masteryLevels'
>;
