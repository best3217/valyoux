import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NextLink from 'next/link'
import { PATH_AUTH } from '../../../routes/paths'
import { useFileUpload } from "use-file-upload";
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
// @mui
import { Box, Typography, Link, Stack, IconButton, InputAdornment, Alert, Button, ButtonUnstyled } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';

// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form'
import Countries from './country'
import Image from '../../../components/Image'

// ----------------------------------------------------------------------

const RegisterButton = styled(ButtonUnstyled)(() => ({
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

const UploadContent = styled('div')(() => ({
  position: 'relative'
}));

const UploadButton = styled(Button)(() => ({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  opacity: 0
}));

const UploadDefaultIcon = styled(Image)(() => ({
  width:'175px',
  height: '175px',
  objectFit: 'cover',
  margin: 'auto',
  border: '5px solid',
  borderRadius: '50%'
}));

export default function RegisterForm() {
  const { register } = useAuth();

  const router = useRouter();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = useState(new Date());

  const defaultSrc = "/icons/upload-icon.png";

  const [files, selectFiles] = useFileUpload();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    birthDay: Yup.string().required('Birthday is required'),
    country: Yup.string().required('Country is required')
  });

  const defaultValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    birthDay: date.toISOString().slice(0, 10),
    country: '',
    terms:false
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    let avatar = "";

    try {
      if(files) {
        const body = new FormData();
        body.append("file", files.file);
        await fetch("/api/upload", {
          method: "POST",
          body
        }).then((res) => res.text()).then((data) => {
          console.log(JSON.parse(data))
          avatar = location.origin + '/uploads/'+JSON.parse(data).fileName
        });
      }
      setTimeout(() => {
        register(data.email, data.password, data.firstName, data.lastName, data.phoneNumber, data.birthDay, data.country, avatar).then(res => {
          if(res.status !== 'error') {
            enqueueSnackbar('Rester Successfully!', { variant: 'success' });
            setTimeout(() => {
              router.push('/auth/login');
            }, 1500);
          }else {
            console.log(res.message)
            setError('email', {type:'focus', message:res.message});
          }
        })
      }, 1000);
      
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <UploadContent sx={{ mb:2 }}>
            <UploadDefaultIcon sx={{ borderColor: 'primary.lighter' }} src={files?.source || defaultSrc} alt="preview" />
            <UploadButton
              onClick={() =>
                selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                  console.log("Files Selected", { name, size, source, file });
                })
              }
            >
              Upload Avatar
            </UploadButton>
          </UploadContent>

          <RHFTextField name="firstName" label="First name" size="small" />
          <RHFTextField name="lastName" label="Last name" size="small" />
          <RHFTextField name="email" label="E-mail" size="small" />
          <RHFTextField name="phoneNumber" label="Phone number" type="number" size="small" />

          <DatePicker
            disableFuture
            label="Date of Birthday"
            openTo="year"
            views={['year', 'month', 'day']}
            value={date}
            onChange={(newValue) => {
              setDate(newValue.toISOString().slice(0, 10))
            }}
            renderInput={(params) => <RHFTextField name="birthDay" size="small" {...params} />}
          />

          <RHFTextField
            name="password"
            label="Password"
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

          <Autocomplete
            size="small"
            options={Countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <RHFTextField
                name="country"
                label="Choose a country"
                size="small"
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
              onChange={(e, data) => (data)?setValue('country', data.label):setValue('country', '')}
          />

          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" sx={{ my: 2 }}>
            <RHFCheckbox name="terms" bgColor="success" size="small" sx={{ '& .MuiSvgIcon-root': { fontSize: 100 }, color:'success.main', mr: 1 }} label={<Typography variant="subtitle">By registering I agree to the Valyou X.</Typography>} />
            <NextLink href={PATH_AUTH.register} passHref>
              <Link variant="subtitle2" underline="none" 
                  sx={[{fontSize:13},(theme) => ({
                  '&:hover': {
                    color: theme.palette.success.main,
                  }
                })]}
              >
                Terms of Use
              </Link>
            </NextLink>
          </Stack>

          <RegisterButton type="submit">
            <Image 
              src="/icons/register-btn.svg"
              alt="login"
              style={{ width: 120, margin: 'auto' }}
            />
          </RegisterButton>
        </Stack>
      </FormProvider>
    </>
  );
}
