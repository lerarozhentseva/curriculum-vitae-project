import { IProfile } from "./IProfile";

type ProfileInput = Omit<IProfile, 'id' | 'created_at' | 'full_name' | 'avatar'>;

export interface IUpdateUserFormData {
  profile: ProfileInput;
  cvsIds: string[];
  departmentId: string;
  positionId: string;
}

