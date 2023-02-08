import React, { FC, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Paper, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IInput } from '../graphql/auth/IInput';

interface FormProps {
  formType: {
    title: string;
    text: string;
    buttonText: string;
  };
  loading: boolean;
  onSubmit: (data: IInput) => void;
}

const Form: FC<FormProps> = ({ formType, onSubmit, loading }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const showPassword = () => {
    setHidePassword((hidePassword) => !hidePassword);
  };

  const { title, text, buttonText } = formType;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IInput>();

  const passwordValidation = {
    ...register('password', {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Your password must be larger then 5 characters'
      }
    })
  };

  return (
    <Paper sx={{ width: '500px', height: '420px', m: '100px auto' }}>
      <Grid
        container
        direction="column"
        sx={{ alignItems: 'center', p: 2, justifyContent: 'center' }}
      >
        <Typography sx={{ mt: 2 }} variant="h4">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{text}</Typography>
        <form
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e);
          }}
        >
          <TextField
            fullWidth
            placeholder="Enter email"
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            type="email"
            {...register('email')}
          />

          <TextField
            fullWidth
            placeholder="Enter password"
            variant="outlined"
            type={hidePassword ? 'password' : 'text'}
            {...passwordValidation}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={showPassword}>
                  {hidePassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />

          <LoadingButton
            fullWidth
            type="submit"
            sx={{ mt: 3 }}
            size="large"
            variant="contained"
            loading={loading}
          >
            {buttonText}
          </LoadingButton>
        </form>
      </Grid>
    </Paper>
  );
};

export default Form;
