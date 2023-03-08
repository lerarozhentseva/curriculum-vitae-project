import { IUser } from '@graphql/interfaces';

export interface IDeleteEmployeeDisclosureProps {
  user: IUser;
  onBothClose: (onChildClose: () => void) => void;
}
