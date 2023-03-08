import { IUser } from '@graphql/interfaces/IUser';

export interface IEmpoyeesTableRowProps {
  user: IUser | null;
  isLoading: boolean;
}
