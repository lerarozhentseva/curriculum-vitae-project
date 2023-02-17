import React from 'react';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@hooks/useAuthHook';
import useOpenMenu from '@hooks/useOpenMenu';
import { tabsData } from '@components/Header/utils/utils';
import { ToolbarBox } from '@components/Header/header.styles';
import UserMenu from '../UserMenu/UserMenu';
import AppTabs from '../Tab/AppTabs';
import { SideMenu } from '../SideMenu/SideMenu';

const Header = () => {
  const isAuth = useAuth();
  const { isOpenMenu, handleOpenMenu, handleCloseMenu } = useOpenMenu();

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
          <ToolbarBox>
            <AppTabs
              tabsData={tabsData}
              textColor="secondary"
              indicatorColor="secondary"
              //don't know what to write in type
              type={'??'}
            />
          </ToolbarBox>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
