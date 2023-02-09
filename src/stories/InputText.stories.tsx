import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import InputTextField, { InputProps } from '../components/Input/InputTextField';

export default {
  title: 'InputText',
  component: InputTextField
};

export const CommonInput = (args: InputProps) => <InputTextField {...args}></InputTextField>;

export const FirstNameInput = () => (
  <InputTextField name="First Name" inputType="text"></InputTextField>
);
export const LastNameInput = () => (
  <InputTextField name="Last Name" inputType="text"></InputTextField>
);
export const EmailInput = () => <InputTextField name="" inputType="email"></InputTextField>;
export const PasswordInput = () => (
  <InputTextField
    inputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <VisibilityIcon />
        </InputAdornment>
      )
    }}
    name=""
    inputType="password"
  ></InputTextField>
);

export const SearchInput = () => (
  <InputTextField
    placeholder="Search"
    inputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      )
    }}
    name=""
    inputType="text"
  ></InputTextField>
);
