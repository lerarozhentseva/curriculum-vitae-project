import { Divider, IconButton, Menu, Typography, Avatar } from '@mui/material';
import { AccountCircle, Settings as SettingsIcon, Logout as LogoutIcon } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { IUserResult } from '@graphql/user/IUserResult';
import { UserQuery } from '@graphql/user/UserQuery';
import { authService } from '@graphql/auth/authService';
import { MenuPaperProps, StyledMenuBox } from '@components/UserMenu/userMenu.styles';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    authService.clearStorage();
  };

  const userData = useReactiveVar(authService.user$);
  const { data } = useQuery<IUserResult>(UserQuery, {
    variables: { id: userData?.id }
  });
  const user = data?.user;

  const getAvatarLetter = (): string => {
    if (user?.profile.first_name) {
      return user?.profile.first_name[0].toUpperCase();
    }
    return user?.email[0].toUpperCase() || '';
  };

  const getAvatarName = () => {
    if (user?.profile.first_name && user?.profile.last_name) return `${user?.profile.full_name}`;
    return user?.email;
  };

  return (
    <StyledMenuBox>
      <Typography>{getAvatarName()}</Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenMenu}
        color="secondary"
      >
        <Avatar sx={{ backgroundColor: 'secondary.main' }}>{getAvatarLetter()}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        PaperProps={{ sx: MenuPaperProps }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate(`/employees/${user?.id}/profile`)}>
          <AccountCircle sx={{ pr: 1 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <SettingsIcon sx={{ pr: 1 }} /> Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={logOut}>
          <LogoutIcon sx={{ pr: 1 }} /> LogOut
        </MenuItem>
      </Menu>
    </StyledMenuBox>
  );
};

export default UserMenu;
