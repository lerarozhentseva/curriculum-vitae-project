import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material';
import '../index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';
import LoginPage from '../pages/auth/LoginPage/LoginPage';
import EmployeesPage from '../pages/EmployeesPage/EmployeesPage';
import SignupPage from '../pages/auth/SignupPage/SignupPage';
import { useAuth } from '../hooks/useAuthHook';
import { routes } from '../route/routeConstants';
import { PrivateRoute } from '../route/components/PrivateRoute';
import theme from '../theme/theme';
import { PublicRoute } from '../route/components/PublicRoute';

const App: FC = (): JSX.Element => {
  const isAuth = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route
              index
              element={
                isAuth ? (
                  <Navigate to={`/${routes.EMPLOYEES}`} replace />
                ) : (
                  <Navigate to={`/${routes.LOGIN}`} replace />
                )
              }
            />
            <Route
              path={routes.LOGIN}
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path={routes.SIGNUP}
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            />
            <Route
              path={routes.EMPLOYEES}
              element={<PrivateRoute>{<EmployeesPage />}</PrivateRoute>}
            />
          </Routes>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
