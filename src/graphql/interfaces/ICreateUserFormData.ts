import { IProfile } from "./IProfile";

interface IAuthInput {
  email: string;
  password: string;
}

type ProfileInput = Omit<IProfile,'id' | 'created_at' | 'full_name' | 'avatar'>;

export interface ICreateUserFormData {
  auth: IAuthInput;
  profile: ProfileInput;
  cvsIds: string[];
  departmentId: string;
  positionId: string;
  role: string;
}

