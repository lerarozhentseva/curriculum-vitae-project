import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';
import LoginPage from '../pages/LoginPage/LoginPage';
import EmployeesPage from '../pages/EmployeesPage/EmployeesPage';
import SignupPage from '../pages/SignupPage/SignupPage';
import { useAuth } from '../hooks/useAuthHook';
import { routes } from '../route/routeConstants';
import { PublicRoute } from '../route/PublicRoute';
import { PrivateRoute } from '../route/PrivateRoute';

const App: FC = (): JSX.Element => {
  const isAuth = useAuth();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            element={
              isAuth ? (
                <Navigate to={`/${routes.EMPLOYEES}`} replace />
              ) : (
                <Navigate to={`/${routes.LOGIN}`} replace />
              )
            }
          />
          <Route path={routes.LOGIN} element={<PublicRoute>{<LoginPage />}</PublicRoute>} />
          <Route path={routes.SIGNUP} element={<PublicRoute>{<SignupPage />}</PublicRoute>} />
          <Route
            path={routes.EMPLOYEES}
            element={<PrivateRoute>{<EmployeesPage />}</PrivateRoute>}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
