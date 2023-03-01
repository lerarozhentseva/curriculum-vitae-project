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

export const pages = [
  { path: '/employees', name: 'Employee' },
  { path: '/profile', name: 'Profile' }
];

export interface BreadcrumbProps {
  currentPath: string;
}
