import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { ILanguage } from '@graphql/interfaces';
import { GetLanguagesQuery } from '@graphql/languages';
import { useAdaptToSelect } from '@hooks/index';
import { PROFICIENCY_LEVELS } from '@pages/CvDetailsPage/utils';
import { CvMasterySection } from '@pages/CvDetailsPage/components/CvMasterySection';
import { ICvLanguagesSelectProps } from '.';

const CvLanguagesSelect: FC<ICvLanguagesSelectProps> = ({
  chosen,
  onChoiceChange,
  onMasteryChange,
  masteryMap
}) => {
  const { data: languagesData } = useQuery<{ languages: ILanguage[] }>(GetLanguagesQuery);
  const languages = useAdaptToSelect(languagesData?.languages, 'name');

  return (
    <CvMasterySection
      chosen={chosen}
      options={languages}
      selectLabel="Languages"
      selectName="languages"
      onChoiceChange={onChoiceChange}
      onMasteryChange={onMasteryChange}
      masteryLevels={PROFICIENCY_LEVELS}
      masteryMap={masteryMap}
    />
  );
};

export default CvLanguagesSelect;
