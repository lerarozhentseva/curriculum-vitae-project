import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import {
  Assignment,
  Close as CloseIcon,
  Groups,
  Translate as TranslateIcon,
  ListAlt as ListAltIcon
} from '@mui/icons-material';
import { MenuList, Box, Divider } from '@mui/material';
import BallotIcon from '@mui/icons-material/Ballot';
import { StyledIconButton, StyledGroupIcon } from '@components/SideMenu/sideMenu.styles';
import { routes } from '@route/routeConstants';
import { StyledDrawerBox, StyledDrawerToolbar } from '@components/SideMenu/sideMenu.styles';
import SideMenuItem from '@components/SideMenu/MenuItemSide';

interface ISideMenuProps {
  open: boolean;
  onClose: () => void;
}

const iconStyles = {
  sx: {
    backgroundColor: 'secondary.contrastText',
    mr: 2
  }
};

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
              <StyledGroupIcon {...iconStyles} />
              Employees
            </SideMenuItem>
            <SideMenuItem path={`/${routes.PROJECTS}`}>
              <Assignment {...iconStyles} />
              Projects
            </SideMenuItem>
            <SideMenuItem path={`/${routes.CVS}`}>
              <BallotIcon {...iconStyles} />
              CVs
            </SideMenuItem>
            <Divider />
            <SideMenuItem path={`/${routes.DEPARTMENTS}`}>
              <Groups {...iconStyles} />
              Departments
            </SideMenuItem>
            <SideMenuItem path={`/${routes.POSITIONS}`}>
              <ListAltIcon {...iconStyles} />
              Positions
            </SideMenuItem>
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
