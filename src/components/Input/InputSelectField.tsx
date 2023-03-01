import { MenuItem, StandardTextFieldProps } from '@mui/material';
import { StyledTextField } from '@components/Input/InputField.styles';

export interface InputSelectProps extends StandardTextFieldProps {
  data: Array<{ id: number; name: string; value?: string | number | readonly string[] }>;
  multiple?: boolean;
}

const InputSelectField = ({
  label,
  size = 'medium',
  sx,
  data,
  multiple,
  ...inputProps
}: InputSelectProps) => {
  return (
    <StyledTextField
      {...inputProps}
      select
      fullWidth
      size={size}
      margin="normal"
      label={label}
      sx={sx}
      SelectProps={{ multiple }}
    >
      {data.map(({ id, name, value }) => (
        <MenuItem value={value} key={id}>
          {name}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};

export default InputSelectField;
