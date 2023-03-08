import { IUser } from '@graphql/interfaces/IUser';

export interface IEmployeesTableProps {
  users: IUser[];
  isLoading: boolean;
}

export interface IFlattenedUser extends IUser {
  first_name: string;
  last_name: string;
  avatar: string;
}
