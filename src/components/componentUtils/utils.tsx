import { routes } from '@route/routeConstants';

export const tabsData = [
  {
    label: 'LOGIN',
    id: 16,
    value: `/${routes.LOGIN}`
  },
  {
    label: 'SIGNUP',
    id: 17,
    value: `/${routes.SIGNUP}`
  }
];

export const changePath = (path: string, value: string) => {
  const splitPath = path.split('/');
  splitPath[splitPath.length - 1] = value;
  return splitPath.join('/');
};

export const profileTabs = [
  {
    label: 'PROFILE',
    id: 18,
    value: changePath(location.pathname, 'profile')
  },
  {
    label: 'SKILLS',
    id: 19,
    value: changePath(location.pathname, 'skills')
  },
  {
    label: 'LANGUAGES',
    id: 20,
    value: changePath(location.pathname, 'languages')
  },
  {
    label: 'CVS',
    id: 21,
    value: changePath(location.pathname, 'cvs')
  }
];

export const toTitleCase = (str: string) => {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
