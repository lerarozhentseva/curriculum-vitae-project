import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuthHook';
import { routes } from '../routeConstants';

interface IPublicRouteProps {
  children: React.ReactNode | JSX.Element;
}

export const PublicRoute: FC<IPublicRouteProps> = ({ children }) => {
  const isAuth = useAuth();

  if (isAuth) {
    return <Navigate to={`/${routes.EMPLOYEES}`} />;
  }

  return <>{children}</>;
};
