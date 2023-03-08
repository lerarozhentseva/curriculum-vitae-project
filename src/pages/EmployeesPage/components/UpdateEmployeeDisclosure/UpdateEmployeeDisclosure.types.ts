import { IUser } from '@graphql/interfaces/IUser';

export interface IUpdateEmployeeDisclosureProps {
  user: IUser;
  onBothClose: (onChildClose: () => void) => void;
}
