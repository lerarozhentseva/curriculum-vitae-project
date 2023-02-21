import { Box, Divider, IconButton, Menu, Typography, Avatar } from '@mui/material';
import { AccountCircle, Settings as SettingsIcon, Logout as LogoutIcon } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // @ts-ignore
  const getUserEmail = JSON.parse(localStorage.getItem('user')).email;
  const avatarLetter = getUserEmail[0].toUpperCase();

  return (
    <StyledMenuBox>
      <Typography>{getUserEmail}</Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenMenu}
        color="secondary"
      >
        <Avatar sx={{ backgroundColor: 'secondary.main' }}>{avatarLetter}</Avatar>
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
        <MenuItem onClick={() => navigate('/profile')}>
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
