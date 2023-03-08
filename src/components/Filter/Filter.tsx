import { FC } from 'react';
import { Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { IFilterProps, FilterTextField } from '.';

const Filter: FC<IFilterProps> = ({ query, onChange }) => {
  return (
    <FilterTextField
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

export default Filter;
