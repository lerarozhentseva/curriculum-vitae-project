import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import { Assignment, Close as CloseIcon, Translate as TranslateIcon } from '@mui/icons-material';
import { MenuList, Box } from '@mui/material';
import { StyledIconButton, StyledGroupIcon } from '@components/SideMenu/sideMenu.styles';
import { routes } from '@route/routeConstants';
import { StyledDrawerBox, StyledDrawerToolbar } from '@components/SideMenu/sideMenu.styles';
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
      <StyledDrawerBox>
        <StyledDrawerToolbar>
          <StyledIconButton onClick={handleCloseMenu}>
            <CloseIcon />
          </StyledIconButton>
        </StyledDrawerToolbar>
        <Box>
          <MenuList>
            <SideMenuItem path={`/${routes.EMPLOYEES}`}>
              <StyledGroupIcon sx={{ backgroundColor: 'secondary.contrastText', mr: 2 }} />
              Employees
            </SideMenuItem>
            <SideMenuItem path={`/${routes.PROJECTS}`}>
              <Assignment sx={{ backgroundColor: 'secondary.contrastText', mr: 2 }} />
              Projects
            </SideMenuItem>
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
      </StyledDrawerBox>
    </Drawer>
  );
};
