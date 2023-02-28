import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';

const EmployeesTableRowDisclosure = () => {
  const [anchor, setAnchor] = useState<Element | null>(null);

  const onOpen = useCallback((e: MouseEvent) => {
    setAnchor(e.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setAnchor(null);
  }, []);

  return (
    <>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={onClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Delete User</MenuItem>
      </Menu>
    </>
  );
};

export default EmployeesTableRowDisclosure;
