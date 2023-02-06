import { ThemeProvider } from "@mui/material";
import theme from "../theme/theme";
import "../index.css";
import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/client";
import LoginPage from "../pages/LoginPage/LoginPage";
import EmployeesPage from "../pages/EmployeesPage/EmployeesPage";
import SignupPage from "../pages/SignupPage/SignupPage";

const App: FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
);
};

export default App;
