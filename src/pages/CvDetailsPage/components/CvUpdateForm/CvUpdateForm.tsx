import { FC, useCallback, useMemo } from 'react';
import { LinearProgress, Paper, Typography } from '@mui/material';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useAdaptToSelect, useNestedFormData, useDerivedMap, useRequest } from '@hooks/index';
import { InputTextField } from '@components/Input';
import { ConfirmButton } from '@components/Button';
import { authService } from '@graphql/auth/authService';
import { GetSkillsQuery } from '@graphql/skills';
import { ISkill, IUpdateCvFormData } from '@graphql/interfaces';
import { UpdateCvMutation } from '@graphql/cvs/UpdateCvMutation';
import { GetCvQuery } from '@graphql/cvs';
import { ILanguage } from '@graphql/interfaces/ILanguage';
import { GetLanguagesQuery } from '@graphql/languages';
import { CvMasterySection } from '@pages/CvDetailsPage/components/CvMasterySection';
import { MASTERY_LEVELS, PROFICIENCY_LEVELS } from '@pages/CvDetailsPage/utils';
import {
  IUpdateCvMutationParameters,
  IUpdateCvMutationReturnValue
} from '@graphql/cvs/UpdateCvMutation.types';
import { Toast } from '@components/Toast';
import { ICvUpdateFormProps } from '.';

const CvUpdateForm: FC<ICvUpdateFormProps> = ({ cv }) => {
  const { formData, onFormFieldChange } = useNestedFormData<IUpdateCvFormData>({
    name: cv.name,
    description: cv.description,
    skills: cv.skills?.map((skill) => skill.skill_name) ?? [],
    languages: cv.languages?.map((language) => language.language_name) ?? [],
    projectsIds: cv.projects?.map((project) => project.id) ?? [],
    userId: cv.user?.id ?? null,
    is_template: cv.is_template
  });

  const [updateAction, { loading, error: nativeError }] = useMutation<
    IUpdateCvMutationReturnValue,
    IUpdateCvMutationParameters
  >(UpdateCvMutation, {
    refetchQueries: [{ query: GetCvQuery, variables: { id: cv.id } }, 'GetCv']
  });

  const user = useReactiveVar(authService.user$);

  const allowedToUpdate = useMemo(() => {
    return user?.role === 'admin' || user?.id === cv.user?.id;
  }, [user, cv]);

  const { data: skillsData } = useQuery<{ skills: ISkill[] }>(GetSkillsQuery);
  const skills = useAdaptToSelect(skillsData?.skills, 'name');

  const { data: languagesData } = useQuery<{ languages: ILanguage[] }>(GetLanguagesQuery);
  const languages = useAdaptToSelect(languagesData?.languages, 'name');

  const [masteryMap, onSkillsChange, onMasteryChange] = useDerivedMap(
    cv.skills,
    'skill_name',
    'mastery',
    MASTERY_LEVELS[0],
    onFormFieldChange
  );
  const [proficiencyMap, onLanguagesChange, onProficiencyChange] = useDerivedMap(
    cv.languages,
    'language_name',
    'proficiency',
    PROFICIENCY_LEVELS[0],
    onFormFieldChange
  );

  const updateCv = useCallback(async () => {
    const cvInput = {
      ...formData,
      skills:
        formData.skills?.map((skill) => ({
          skill_name: skill,
          mastery: masteryMap[skill]
        })) ?? [],
      languages:
        formData.languages?.map((language) => ({
          language_name: language,
          proficiency: proficiencyMap[language]
        })) ?? []
    };

    await updateAction({ variables: { id: cv.id, cv: cvInput } });
  }, [formData, masteryMap, proficiencyMap]);

  const [updateCvRequest, error, clearError] = useRequest(updateCv, nativeError);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Paper sx={{ padding: '20px', margin: '20px' }} elevation={3}>
        <Typography>
          Assigned to:{' '}
          {cv.user ? `${cv.user.profile.full_name} (${cv.user.position_name})` : '[None]'}
        </Typography>
        <InputTextField
          inputType="text"
          value={formData.name}
          onChange={onFormFieldChange}
          label="Name"
          name="name"
        />
        <InputTextField
          inputType="text"
          value={formData.description}
          onChange={onFormFieldChange}
          label="Description"
          name="description"
        />
        <CvMasterySection
          chosen={formData.skills}
          options={skills}
          selectLabel="Skills"
          selectName="skills"
          onChoiceChange={onSkillsChange}
          onMasteryChange={onMasteryChange}
          masteryLevels={MASTERY_LEVELS}
          masteryMap={masteryMap}
        />
        <CvMasterySection
          chosen={formData.languages}
          options={languages}
          selectLabel="Languages"
          selectName="languages"
          onChoiceChange={onLanguagesChange}
          onMasteryChange={onProficiencyChange}
          masteryLevels={PROFICIENCY_LEVELS}
          masteryMap={proficiencyMap}
        />
        <ConfirmButton
          onClick={updateCvRequest}
          sx={{ marginTop: '20px' }}
          name="Update"
          disabled={!allowedToUpdate}
        />
        {loading && <LinearProgress />}
      </Paper>
    </>
  );
};

export default CvUpdateForm;
