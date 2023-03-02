import { FC } from 'react';
import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { IEmployeesFilterProps, EmployeesFilterTextField } from '.';

const EmployeesFilter: FC<IEmployeesFilterProps> = ({ query, onChange }) => {
  return (
    <EmployeesFilterTextField
      type="text"
      value={query}
      onChange={onChange}
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        )
      }}
    />
  );
};

export default EmployeesFilter;
