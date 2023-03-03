import { IProfile } from "./IProfile";
import { IUpdateUserFormData } from "./IUpdateUserFormData";

interface IAuthInput {
  email: string;
  password: string;
}

export interface ICreateUserFormData extends IUpdateUserFormData {
  auth: IAuthInput;
  role: string;
}

