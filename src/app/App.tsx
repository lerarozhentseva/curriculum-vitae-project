import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material';
import '../index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '@graphql/client';
import LoginPage from '@authPages/LoginPage';
import EmployeesPage from '@pages/EmployeesPage';
import SignupPage from '@authPages/SignupPage';
import { routes } from '@route/routeConstants';
import { PrivateRoute } from '@routeComponents/PrivateRoute';
import theme from '@theme/theme';
import { PublicRoute } from '@routeComponents/PublicRoute';
import ProfilePage from '@pages/ProfilePage/ProfilePage';

const App: FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path={routes.MAIN} element={<Navigate to={routes.LOGIN} />} />
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
            <Route path={routes.PROFILE} element={<PrivateRoute>{<ProfilePage />}</PrivateRoute>} />
          </Routes>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
