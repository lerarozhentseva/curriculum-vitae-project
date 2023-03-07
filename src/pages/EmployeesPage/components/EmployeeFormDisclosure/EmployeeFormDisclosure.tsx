import { useCallback, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress
} from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { EmployeeFormDialogSection } from '@pages/EmployeesPage/components/EmployeeFormDialogSection';
import { InputTextField, InputSelectField } from '@components/Input';
import { GetDepartmentsQuery } from '@graphql/departments';
import { GetPositionsQuery } from '@graphql/positions';
import { IDepartment, IPosition, IUpdateUserFormData } from '@graphql/interfaces';
import { useAdaptToSelect, useRequest } from '@hooks/index';
import { Toast } from '@components/Toast';
import { IEmployeeFormDisclosureProps } from '.';

function EmployeeFormDisclosure<T extends IUpdateUserFormData>(
  props: IEmployeeFormDisclosureProps<T>
) {
  const {
    action,
    actionName,
    formData,
    onFormFieldChange,
    children,
    nativeError,
    isOpen,
    onClose,
    isLoading
  } = props;

  const [getDepartments, { data: departmentsData }] = useLazyQuery<{
    departments: IDepartment[];
  }>(GetDepartmentsQuery);
  const [getPositions, { data: positionsData }] = useLazyQuery<{
    positions: IPosition[];
  }>(GetPositionsQuery);

  const load = useCallback(async () => {
    await Promise.all([getDepartments(), getPositions()]);
  }, []);

  const departments = useAdaptToSelect(departmentsData?.departments, 'id');
  const positions = useAdaptToSelect(positionsData?.positions, 'id');

  const executeAndClose = useCallback(async () => {
    await action();
    onClose();
  }, [action]);

  const [actionRequest, error, clearError] = useRequest(executeAndClose, nativeError);

  useEffect(() => {
    if (isOpen) load();
  }, [isOpen]);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
        {isLoading && <LinearProgress />}
        <DialogTitle textAlign="center">{actionName} Employee</DialogTitle>
        <DialogContent onKeyDown={(e) => e.stopPropagation()}>
          {children}
          <EmployeeFormDialogSection heading="Personal Info">
            <InputTextField
              value={formData.profile.first_name}
              onChange={onFormFieldChange}
              name="profile.first_name"
              inputType="text"
              label="First Name"
            />
            <InputTextField
              value={formData.profile.last_name}
              onChange={onFormFieldChange}
              name="profile.last_name"
              inputType="text"
              label="Last Name"
            />
          </EmployeeFormDialogSection>
          <EmployeeFormDialogSection heading="Status">
            <InputSelectField
              value={formData.departmentId}
              name="departmentId"
              onChange={onFormFieldChange}
              label="Department"
              data={departments}
            />
            <InputSelectField
              value={formData.positionId}
              name="positionId"
              onChange={onFormFieldChange}
              label="Position"
              data={positions}
            />
          </EmployeeFormDialogSection>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={actionRequest}>{actionName}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeFormDisclosure;
