import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
//axios
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

ForgetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ForgetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef();

  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const email = data.email
    const response = axios.post('/api/account/password/reset', {
      email
    }).then(res => {
      onSent();
      onGetEmail(data.email);
    })
    .catch(error => {
      setError('email', {type:'focus', message:error})
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" size="small" label="E-mail" />

        <LoadingButton fullWidth type="submit" variant="contained" loading={isSubmitting}>
          Send reset password email
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
