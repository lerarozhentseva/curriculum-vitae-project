import { ICvMasterySectionProps } from '@pages/CvDetailsPage/components/CvMasterySection';

export type ICvSkillsSelectProps = Omit<
  ICvMasterySectionProps,
  'options' | 'selectLabel' | 'selectName' | 'masteryLevels'
>;
