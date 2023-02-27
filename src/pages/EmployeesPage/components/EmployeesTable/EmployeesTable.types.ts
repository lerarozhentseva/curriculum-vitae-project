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

export interface ISortingRules {
  field: keyof IFlattenedUser;
  order: SortingOrder;
}

export enum SortingOrder {
  ASC = 0,
  DESC = 1
}
