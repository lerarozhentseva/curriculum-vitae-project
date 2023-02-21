import React from 'react';
import { Box, SxProps, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { Link, useLocation } from 'react-router-dom';

export type AppTabsProps = {
  tabsData: Array<{ label: string; id: number; value: string }>;
  textColor: 'primary' | 'secondary';
  indicatorColor: 'primary' | 'secondary';
  type: string;
  sx?: SxProps;
};

const AppTabs = ({ tabsData, textColor, indicatorColor, type, ...tabsProps }: AppTabsProps) => {
  const location = useLocation();
  return (
    <TabContext value={location.pathname}>
      <Box>
        <TabList
          {...tabsProps}
          textColor={textColor}
          indicatorColor={indicatorColor}
          aria-label={type}
        >
          {Array.isArray(tabsData) &&
            tabsData?.map(({ id, label, value }) => (
              <Tab
                key={id}
                label={label}
                value={value}
                sx={{ color: 'white' }}
                component={Link}
                to={value}
              ></Tab>
            ))}
        </TabList>
      </Box>
    </TabContext>
  );
};

export default AppTabs;
