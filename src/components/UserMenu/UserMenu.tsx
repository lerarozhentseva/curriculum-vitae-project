import { Box, Divider, IconButton, Menu, Typography, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useState } from 'react';
import { authService } from '../../graphql/auth/authService';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        PaperProps={{
          sx: {
            overflow: 'visible',
            width: '250px',
            filter: 'drop-shadow(0px 3px 10px rgba(0,0,0,0.5))',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              backgroundColor: 'background.paper',
              zIndex: 0,
              top: 0,
              right: 30,
              width: 10,
              height: 10,
              transform: 'translateY(-50%) rotate(45deg)'
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCloseMenu}>
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
    </Box>
  );
};

export default UserMenu;
