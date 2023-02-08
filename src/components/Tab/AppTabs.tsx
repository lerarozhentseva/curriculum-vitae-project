import React, { useState } from 'react';
import { Box, SxProps, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

export type AppTabsProps = {
  tabsData: Array<{ label: string; id: number; value: string }>;
  textColor: 'primary' | 'secondary';
  indicatorColor: 'primary' | 'secondary';
  type: string;
  sx?: SxProps;
};

const AppTabs = ({ tabsData, textColor, indicatorColor, type, ...tabsProps }: AppTabsProps) => {
  const [value, setValue] = useState('1');
  return (
    <TabContext value={value}>
      <Box>
        <TabList
          {...tabsProps}
          textColor={textColor}
          indicatorColor={indicatorColor}
          aria-label={type}
          onChange={(e, newValue) => setValue(newValue)}
        >
          {Array.isArray(tabsData) &&
            tabsData?.map(({ id, label, value }) => (
              <Tab key={id} label={label} value={value}></Tab>
            ))}
        </TabList>
      </Box>
    </TabContext>
  );
};

export default AppTabs;
