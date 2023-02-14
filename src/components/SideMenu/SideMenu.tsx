import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TranslateIcon from '@mui/icons-material/Translate';
import { Divider, MenuItem, MenuList, Toolbar, Box } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { NavLink } from 'react-router-dom';
import { routes } from '../../route/routeConstants';

interface ISideMenuProps {
  open: boolean;
  onClose: () => void;
}

export const SideMenu: FC<ISideMenuProps> = ({ open, onClose }) => {
  const handleCloseMenu = () => {
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClick={handleCloseMenu}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 260
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'primary.main'
          }}
        >
          <IconButton
            onClick={handleCloseMenu}
            sx={{
              color: 'secondary.main'
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box>
          <MenuList>
            <MenuItem
              sx={{ fontSize: 20 }}
              component={NavLink}
              to={`/${routes.EMPLOYEES}`}
              onClick={handleCloseMenu}
            >
              <GroupIcon sx={{ backgroundColor: 'secondary.contrastText', mr: 2 }} />
              Employees
            </MenuItem>
            <MenuItem sx={{ fontSize: 20 }} onClick={handleCloseMenu}>
              Projects
            </MenuItem>
            <MenuItem sx={{ fontSize: 20 }} onClick={handleCloseMenu}>
              CVs
            </MenuItem>
            <Divider />
            <MenuItem sx={{ fontSize: 20 }} onClick={handleCloseMenu}>
              Departments
            </MenuItem>
            <MenuItem sx={{ fontSize: 20 }} onClick={handleCloseMenu}>
              Positions
            </MenuItem>
            <MenuItem sx={{ fontSize: 20 }} onClick={handleCloseMenu}>
              Skills
            </MenuItem>
            <MenuItem sx={{ fontSize: 20 }} onClick={handleCloseMenu}>
              <TranslateIcon sx={{ backgroundColor: 'secondary.contrastText', mr: 2 }} />
              Languages
            </MenuItem>
          </MenuList>
        </Box>
      </Box>
    </Drawer>
  );
};
