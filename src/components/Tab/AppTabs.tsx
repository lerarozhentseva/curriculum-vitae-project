import React from 'react';
import { Box, SxProps, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

type Data = {
  label: string;
  id: number;
  value: string;
};

interface IAppTabs {
  tabsData: Data[];
  textColor: 'primary' | 'secondary';
  indicatorColor: 'primary' | 'secondary';
  type: string;
  tabContextValue: string;
  sx?: SxProps;
}

const AppTabs = ({
  tabsData,
  textColor,
  indicatorColor,
  type,
  tabContextValue,
  ...tabsProps
}: IAppTabs) => {
  return (
    <TabContext value={tabContextValue}>
      <Box>
        <TabList
          {...tabsProps}
          textColor={textColor}
          indicatorColor={indicatorColor}
          aria-label={type}
        >
          {tabsData.map(({ id, label, value }) => (
            <Tab key={id} label={label} value={value}></Tab>
          ))}
        </TabList>
      </Box>
    </TabContext>
  );
};

export default AppTabs;
