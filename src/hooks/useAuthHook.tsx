import { useReactiveVar } from '@apollo/client';
import { authService } from '@graphql/auth/authService';

const useAuth = () => {
  const token = useReactiveVar(authService.access_token$);

  return !!token;
};

export default useAuth;
