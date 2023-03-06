import React, { FC } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  SelectChangeEvent
} from '@mui/material';
import { IUser } from '@interfaces/IUser';
import { StyledFormBox } from '@pages/ProfilePage/components/ProfileForm/ProfileForm.styles';
import InputTextField from '@components/Input/InputTextField';
import ConfirmButton from '@components/Button/ConfirmButton';
import { IFormInput } from '@graphql/user/IFormInput';
import { useFormSendProfile } from '@pages/ProfilePage/hooks';

interface ProfileFormProps {
  user?: IUser;
  updateUser: (data: IFormInput) => void;
}

const ProfileForm: FC<ProfileFormProps> = ({ user, updateUser }) => {
  const {
    handleSubmit,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    department,
    setDepartment,
    position,
    setPosition,
    departmentsData,
    positionsData
  } = useFormSendProfile({
    user,
    onSubmit: updateUser
  });

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setDepartment(event.target.value as string);
  };

  const handlePositionChange = (event: SelectChangeEvent<string>) => {
    setPosition(event.target.value as string);
  };

  return (
    <StyledFormBox component="form" onSubmit={handleSubmit}>
      <InputTextField
        inputType="text"
        name="First name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <InputTextField
        name="Last name"
        inputType="text"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <FormControl>
        <InputLabel id="department-label">Department</InputLabel>
        <Select labelId="department-label" value={department} onChange={handleDepartmentChange}>
          <MenuItem value="">
            <Typography>No department</Typography>
          </MenuItem>
          {departmentsData?.departments.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="position-label">Position</InputLabel>
        <Select labelId="position-label" value={position} onChange={handlePositionChange}>
          <MenuItem value="">
            <Typography>No position</Typography>
          </MenuItem>
          {positionsData?.positions.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ConfirmButton
        sx={{
          borderRadius: 0,
          gridColumn: '2 / 3'
        }}
        name={'BEER GO BRRR'}
      />
    </StyledFormBox>
  );
};

export default ProfileForm;
