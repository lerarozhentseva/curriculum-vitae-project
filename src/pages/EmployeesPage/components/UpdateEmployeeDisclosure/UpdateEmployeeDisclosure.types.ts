import { IUser } from '@graphql/interfaces/IUser';

export interface IUpdateEmployeeDisclosureProps {
  user: IUser;
  onParentClose: () => void;
}
