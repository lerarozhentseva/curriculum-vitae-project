import { useReactiveVar } from '@apollo/client';
import { authService } from '../graphql/auth/authService';

export const useAuth = () => {
  const token = useReactiveVar(authService.access_token$);

  return !!token;
};
