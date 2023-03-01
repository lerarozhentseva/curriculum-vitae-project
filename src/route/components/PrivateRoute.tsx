import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/index';
import { routes } from '../routeConstants';

interface IPrivateRouteProps {
  children: React.ReactNode | JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to={`/${routes.LOGIN}`} replace />;
  }

  return <>{children}</>;
};
