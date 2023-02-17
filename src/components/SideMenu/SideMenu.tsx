import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import {
  Close as CloseIcon,
  Translate as TranslateIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { MenuList, Box } from '@mui/material';
import { routes } from '@route/routeConstants';
import { DrawerBox, DrawerToolbar } from '@components/SideMenu/sideMenu.styles';
import SideMenuItem from '@components/SideMenu/MenuItemSide';

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
      <DrawerBox>
        <DrawerToolbar>
          <IconButton
            onClick={handleCloseMenu}
            sx={{
              color: 'secondary.main'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DrawerToolbar>
        <Box>
          <MenuList>
            <SideMenuItem path={`/${routes.EMPLOYEES}`}>
              <GroupIcon sx={{ backgroundColor: 'secondary.contrastText', mr: 2 }} />
              Employees
            </SideMenuItem>
            {/*<SideMenuItem path={}>Projects</SideMenuItem>*/}
            {/*<SideMenuItem path={}>CVs</SideMenuItem>*/}
            {/*<Divider />*/}
            {/*<SideMenuItem path={}>Departments</SideMenuItem>*/}
            {/*<SideMenuItem path={}>Positions</SideMenuItem>*/}
            {/*<SideMenuItem path={}>Skills</SideMenuItem>*/}
            {/*<SideMenuItem path={}>*/}
            {/*  <TranslateIcon sx={{ backgroundColor: 'secondary.contrastText', mr: 2 }} />*/}
            {/*  Languages*/}
            {/*</SideMenuItem>*/}
          </MenuList>
        </Box>
      </DrawerBox>
    </Drawer>
  );
};
