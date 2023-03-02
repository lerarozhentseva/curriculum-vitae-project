import { FC } from 'react';
import { Box } from '@mui/material';
import Header from '@components/Header/Header';
import Breadcrumb from '@components/Breadcrumbs/Breadcrumbs';
import AppTabs from '@components/Tab/AppTabs';
import { profileTabs } from '@components/componentUtils/utils';

interface PrivateEmployeeLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const PrivateEmployeeLayout: FC<PrivateEmployeeLayoutProps> = ({ children }) => {
  return (
    <Box width={'100%'}>
      <Header />
      <Breadcrumb />
      <AppTabs
        tabsData={profileTabs}
        textColor="secondary"
        indicatorColor="secondary"
        type="profile-tabs"
      />
      {children}
    </Box>
  );
};
