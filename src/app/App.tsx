import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material';
import '../index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '@graphql/client';
import LoginPage from '@authPages/LoginPage';
import EmployeesPage from '@pages/EmployeesPage';
import SignupPage from '@authPages/SignupPage';
import { useAuth } from '@hooks/useAuthHook';
import { routes } from '@route/routeConstants';
import { PrivateRoute } from '@routeComponents/PrivateRoute';
import theme from '@theme/theme';
import { PublicRoute } from '@routeComponents/PublicRoute';

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
                //to go to the necessary page when starting application
                isAuth ? (
                  <Navigate to={`/${routes.EMPLOYEES}`} />
                ) : (
                  <Navigate to={`/${routes.LOGIN}`} />
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
