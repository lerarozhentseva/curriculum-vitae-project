import { Link, NavLink } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { NavigateNext as NavigateNextIcon, Home as HomeIcon } from '@mui/icons-material';
import { StyledLink, StyledBreadcrumbsBox } from '@components/Breadcrumbs/breadcrumbs.styles';
import { routes } from '@route/routeConstants';
import { pages, BreadcrumbProps } from '@components/componentUtils/utils';

export default function Breadcrumb({ currentPath }: BreadcrumbProps) {
  const currentPage = pages.find((page) => page.path === currentPath);
  if (!currentPage) {
    return null;
  }
  const breadcrumbItems = pages.slice(0, pages.indexOf(currentPage) + 1);

  return (
    <StyledBreadcrumbsBox>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <StyledLink component={Link} to={`/${routes.EMPLOYEES}`}>
          <HomeIcon sx={{ mr: 1 }} />
          Home
        </StyledLink>
        {breadcrumbItems.map((page) => (
          <StyledLink key={page.path} component={NavLink} to={page.path}>
            {page.name}
          </StyledLink>
        ))}
      </Breadcrumbs>
    </StyledBreadcrumbsBox>
  );
}
