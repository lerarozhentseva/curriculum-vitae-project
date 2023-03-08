import { IUser } from '@graphql/interfaces';

export interface IFlattenedUser extends IUser {
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string;
}
