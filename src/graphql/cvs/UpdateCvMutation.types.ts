import { ILanguageProficiency, ISkillMastery, IUpdateCvFormData } from '@graphql/interfaces';

interface IUpdateCvMutationInput extends Omit<IUpdateCvFormData, 'skills' | 'languages'> {
  skills: ISkillMastery[];
  languages: ILanguageProficiency[];
}

export interface IUpdateCvMutationParameters {
  id: string;
  cv: IUpdateCvMutationInput;
}

export interface IUpdateCvMutationReturnValue {
  id: string;
}
