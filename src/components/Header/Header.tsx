import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@hooks/useAuthHook';
import useOpenMenu from '@hooks/useOpenMenu';
import { tabsData } from '@components/Header/utils/utils';
import { StyledBox, StyledIconButton, StyledToolbar } from '@components/Header/header.styles';
import UserMenu from '../UserMenu/UserMenu';
import AppTabs from '../Tab/AppTabs';
import { SideMenu } from '../SideMenu/SideMenu';

const Header = () => {
  const isAuth = useAuth();
  const { isOpenMenu, handleOpenMenu, handleCloseMenu } = useOpenMenu();

  return (
    <AppBar position="static">
      {isAuth ? (
        <StyledToolbar>
          <StyledIconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </StyledIconButton>
          <SideMenu open={isOpenMenu} onClose={handleCloseMenu} />
          <UserMenu />
        </StyledToolbar>
      ) : (
        <Toolbar>
          <StyledBox>
            <AppTabs
              tabsData={tabsData}
              textColor="secondary"
              indicatorColor="secondary"
              //don't know what to write in type
              type={'??'}
            />
          </StyledBox>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
