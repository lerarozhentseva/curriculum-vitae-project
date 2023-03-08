import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useCallback, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@hooks/index';
import { UpdateEmployeeDisclosure } from '@pages/EmployeesPage/components/UpdateEmployeeDisclosure';
import { DeleteEmployeeDisclosure } from '@pages/EmployeesPage/components/DeleteEmployeeDisclosure';
import { IEmployeesTableRowDisclosureProps } from '.';

const EmployeesTableRowDisclosure: FC<IEmployeesTableRowDisclosureProps> = ({ user }) => {
  const router = useNavigate();

  const { anchor, isOpen, onOpen, onClose } = useDisclosure();

  const visitProfile = useCallback(() => {
    router(`/employees/${user.id}/profile`);
  }, []);

  const onBothClose = useCallback((onChildClose: () => void) => {
    onChildClose();
    onClose();
  }, []);

  return (
    <>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={isOpen}
        onClose={onClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={visitProfile}>Profile</MenuItem>
        <UpdateEmployeeDisclosure user={user} onBothClose={onBothClose} />
        <DeleteEmployeeDisclosure user={user} onBothClose={onBothClose} />
      </Menu>
    </>
  );
};

export default EmployeesTableRowDisclosure;
