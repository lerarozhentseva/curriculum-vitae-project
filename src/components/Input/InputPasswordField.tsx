import { FC, useCallback, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputTextField, { InputProps } from './InputTextField';

const InputPasswordField: FC<InputProps> = (props) => {
  const [isShown, setIsShown] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsShown((previous) => !previous);
  }, []);

  return (
    <InputTextField
      {...props}
      inputType={isShown ? 'text' : 'password'}
      inputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleVisibility}>
              {isShown ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default InputPasswordField;
