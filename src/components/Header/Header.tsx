import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../hooks/useAuthHook';
import AppTabs from '../Tab/AppTabs';
import { routes } from '../../route/routeConstants';
import UserMenu from '../UserMenu/UserMenu';
import { SideMenu } from '../SideMenu/SideMenu';

const Header = () => {
  const isAuth = useAuth();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };
  return (
    <AppBar position="static">
      {isAuth ? (
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <SideMenu open={isOpenMenu} onClose={handleCloseMenu} />
          <UserMenu />
        </Toolbar>
      ) : (
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              m: '0 auto'
            }}
          >
            <AppTabs
              tabsData={[
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
              ]}
              textColor="secondary"
              indicatorColor="secondary"
              //don't know what to write in type
              type={'??'}
            />
          </Box>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
