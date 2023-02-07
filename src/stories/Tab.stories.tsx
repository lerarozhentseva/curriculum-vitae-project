import React from 'react';
import AppTabs from '../components/Tab/AppTabs';

export default {
  title: 'AppTabs',
  component: AppTabs
};

const tabsProfileData = [
  {
    label: 'PROFILE',
    id: 12,
    value: '1'
  },
  {
    label: 'SKILLS',
    id: 13,
    value: '2'
  },
  {
    label: 'LANGUAGES',
    id: 14,
    value: '3'
  },
  {
    label: 'CVS',
    id: 15,
    value: '4'
  }
];

const tabsAuthData = [
  {
    label: 'LOGIN',
    id: 16,
    value: '1'
  },
  {
    label: 'SIGNUP',
    id: 17,
    value: '2'
  }
];

export const AppTabsProfile = () => (
  <AppTabs
    tabContextValue="1"
    type="profile-tabs"
    tabsData={tabsProfileData}
    textColor="primary"
    indicatorColor="secondary"
  ></AppTabs>
);
export const AppTabsAuth = () => (
  <AppTabs
    tabContextValue="1"
    type="profile-tabs"
    tabsData={tabsAuthData}
    textColor="secondary"
    indicatorColor="secondary"
  ></AppTabs>
);
