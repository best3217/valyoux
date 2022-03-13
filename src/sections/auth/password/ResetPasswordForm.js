import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, InputAdornment, IconButton, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
//axios
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const isMountedRef = useIsMountedRef();

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('')

  const router = useRouter();

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const password = data.password;

    axios.put('/api/account/password/reset', {
      token,
      password
    }).then(res => {
      setMessage(res.data.message);
      setAlert('success')
      setOpenAlert(true);
      setTimeout(() => {
        router.push('/auth/login')
      }, 1500);
    })
    .catch((err) => {
      setMessage(err);
      setAlert('error')
      setOpenAlert(true);
    })

    // const email = data.email
    // axios.post('/api/account/password/reset', {
    //   email
    // }).then(() => {
    //   onSent();
    //   onGetEmail(data.email);
    // })
    // .catch(error => {
    //   setError('email', {type:'focus', message:error})
    // });
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   if (isMountedRef.current) {
    //     onSent();
    //     onGetEmail(data.email);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
    <Snackbar
       anchorOrigin={{ vertical:'top', horizontal:'right' }}
        autoHideDuration={5000}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
      >
         <Alert variant="filled" severity={alert} sx={{ width: '100%', color: 'white' }}>
            <AlertTitle>{alert}</AlertTitle>
            {message}
        </Alert>
      </Snackbar>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField
            name="password"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton fullWidth type="submit" variant="contained" loading={isSubmitting}>
            Rest Password
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
