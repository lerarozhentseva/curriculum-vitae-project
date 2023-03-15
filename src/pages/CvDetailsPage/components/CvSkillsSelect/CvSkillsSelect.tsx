import { FC } from 'react';
import { useQuery } from '@apollo/client';
import { ISkill } from '@graphql/interfaces';
import { GetSkillsQuery } from '@graphql/skills';
import { useAdaptToSelect } from '@hooks/index';
import { MASTERY_LEVELS } from '@pages/CvDetailsPage/utils';
import { CvMasterySection } from '@pages/CvDetailsPage/components/CvMasterySection';
import { ICvSkillsSelectProps } from '.';

const CvSkillsSelect: FC<ICvSkillsSelectProps> = ({
  chosen,
  onChoiceChange,
  onMasteryChange,
  masteryMap
}) => {
  const { data: skillsData } = useQuery<{ skills: ISkill[] }>(GetSkillsQuery);
  const skills = useAdaptToSelect(skillsData?.skills, 'name');

  return (
    <CvMasterySection
      chosen={chosen}
      options={skills}
      selectLabel="Skills"
      selectName="skills"
      onChoiceChange={onChoiceChange}
      onMasteryChange={onMasteryChange}
      masteryLevels={MASTERY_LEVELS}
      masteryMap={masteryMap}
    />
  );
};

export default CvSkillsSelect;
