import { ILanguageProficiency } from "./ILanguageProficiency";
import { ISkillMastery } from "./ISkillMastery";

interface IAuthInput {
  email: string;
  password: string;
}

interface IProfileInput {
  first_name: string;
  last_name: string;
  skills: ISkillMastery[];
  languages: ILanguageProficiency[];
}

export interface ICreateUserInput {
  auth: IAuthInput;
  profile: IProfileInput;
  cvsIds: string[];
  departmentId: string;
  positionId: string;
  role: string;
}
