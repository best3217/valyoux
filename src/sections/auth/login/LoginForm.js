import * as Yup from 'yup';
import { useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, ButtonUnstyled  } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { styled } from '@mui/material/styles';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Image from '../../../components/Image';

// ----------------------------------------------------------------------

const LoginButton = styled(ButtonUnstyled)(() => ({
  cursor: 'pointer',
  width: '100%',
  background: 'none',
  border: 'none',
  '&:hover': {
    background: 'none'
  },
  '&:active': {
    background: 'none',
    opacity: 0.8,
  }
}));

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: false,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    try {
      login(data.email, data.password).then((msg) => {
        if(msg) {
          console.log(msg.substring(5,6))
          if(msg.substring(5,6) === 'e') {
            setError('email', {type:'focus', message:msg});
          }else {
            setError('password', {type:'focus', message:msg});
          }
        }
      });
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="E-mail" size="small" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" bgColor="success" label="Remember me" sx={{ color:'success.main' }} />
      </Stack>
        
      <LoginButton type="submit">
        <Image 
          src="/icons/login-btn.svg"
          alt="login"
          style={{ width: 120, margin: 'auto' }}
        />
      </LoginButton>
      <Stack direction="row" justifyContent="center">
        <NextLink href={PATH_AUTH.forgetPassword} passHref>
          <Link variant="subtitle2" underline="none" color="grey.600" 
          sx={[{ fontWeight: 300, fontSize: 13,  }, 
            (theme) => ({
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }),]}
          >
            <LockIcon sx={{ fontSize: 13, mr: 1, verticalAlign: 'text-top' }} />Forgot your password?
          </Link>
        </NextLink>
      </Stack>
    </FormProvider>
  );
}
