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
import ProfilePage from '@pages/ProfilePage';
import ProfileSkillsPage from '@pages/ProfileSkillsPage';
import ProfileLanguagesPage from '@pages/ProfileLanguagesPage';
import ProfileCVsPage from '@pages/ProfileCVsPage';

const App: FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
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
            <Route
              path={routes.EMPLOYEE_SKILLS}
              element={<PrivateRoute>{<ProfileSkillsPage />}</PrivateRoute>}
            />
            <Route
              path={routes.EMPLOYEE_LANGUAGES}
              element={<PrivateRoute>{<ProfileLanguagesPage />}</PrivateRoute>}
            />
            <Route
              path={routes.EMPLOYEE_CVS}
              element={<PrivateRoute>{<ProfileCVsPage />}</PrivateRoute>}
            />
            <Route path="*" element={<Navigate to={routes.EMPLOYEES} />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
