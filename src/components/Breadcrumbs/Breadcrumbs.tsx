import { Link, NavLink, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  PersonOutline as PersonOutlineIcon
} from '@mui/icons-material';
import {
  StyledLink,
  StyledBreadcrumbsBox,
  StyledPrLink
} from '@components/Breadcrumbs/breadcrumbs.styles';
import { routes } from '@route/routeConstants';
import { useUserData } from '@hooks/index';
import { toTitleCase } from '@components/componentUtils/utils';

export default function Breadcrumb() {
  const location = useLocation();
  const { user } = useUserData();
  const breadcrumbItems = location.pathname.split('/').filter((x) => x);

  return (
    <StyledBreadcrumbsBox>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <StyledLink component={Link} to={`/${routes.EMPLOYEES}`}>
          <HomeIcon sx={{ mr: 1 }} />
          Home
        </StyledLink>
        {breadcrumbItems.map((page, index) => {
          const name =
            page === user?.id ? `${toTitleCase(user.profile.full_name)}` : toTitleCase(page);
          const isCurrentUser = page === user?.id;
          const to = `/${breadcrumbItems.slice(0, index + 1).join('/')}`;
          if (isCurrentUser) {
            return (
              <StyledPrLink key={to} component={NavLink} to={to}>
                <PersonOutlineIcon />
                {name}
              </StyledPrLink>
            );
          } else {
            return (
              <StyledLink key={to} component={NavLink} to={to}>
                {name}
              </StyledLink>
            );
          }
        })}
      </Breadcrumbs>
    </StyledBreadcrumbsBox>
  );
}
