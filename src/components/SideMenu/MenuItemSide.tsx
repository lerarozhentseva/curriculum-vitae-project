import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useOpenMenu } from '@hooks/index';

interface MenuProps {
  children: React.ReactNode | JSX.Element;
  path: string;
}

const SideMenuItem: FC<MenuProps> = ({ children, path }) => {
  const { handleCloseMenu } = useOpenMenu();
  return (
    <>
      <MenuItem sx={{ fontSize: 20 }} component={NavLink} to={path} onClick={handleCloseMenu}>
        {children}
      </MenuItem>
    </>
  );
};

export default SideMenuItem;
