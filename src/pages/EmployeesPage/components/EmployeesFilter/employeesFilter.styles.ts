import { styled } from '@mui/material';
import { StyledTextField } from '@components/Input/InputField.styles';

export const EmployeesFilterTextField = styled(StyledTextField)({
  '& .MuiOutlinedInput-input': {
    width: '250px',
    padding: '6.7px 14px',
    paddingLeft: '4px'
  },
  marginLeft: '30px',
  marginBottom: '20px'
});
