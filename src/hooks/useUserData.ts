import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { IUserResult } from '@graphql/user/IUserResult';
import { UserQuery } from '@graphql/user/UserQuery';

const useUserData = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const { loading, error, data } = useQuery<IUserResult>(UserQuery, {
    variables: { id: userId }
  });
  const user = data?.user;
  return { user, loading, error };
};

export default useUserData;
