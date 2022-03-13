import { useState } from 'react'
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux'
// next
import { Router, useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, InputLabel, Typography, OutlinedInput, MenuItem, FormControl, Select, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { updateUser, createUser } from '../../../redux/slices/user';
//hook
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedRole, theme) {
  return {
    fontWeight:
      selectedRole.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function UserNewForm({ isEdit = false, currentUser }) {
  const { push } = useRouter();

  if(!currentUser && isEdit) {
    push(PATH_DASHBOARD.admin.userManage.list)
  }

  const { user } = useAuth();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const [selectedRole, setSelectedRole] = useState([]);

  const { roles } = useSelector((state) => state.role)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedRole(
      typeof value === 'string' ? value.split(',') : value,
      );
    setValue('role', value)
  };

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('country is required'),
    avatar: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    role: Yup.array().required('Role is required')
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      country: currentUser?.country || '',
      avatar: currentUser?.avatar || '',
      role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }

    const values = getValues()
    if(values.role) {
      setSelectedRole(values.role)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const fileUpload = async (file) => {
    const body = new FormData();
    body.append("file", file)
    return await fetch("/api/upload", {
      method: "POST",
      body
    }).then((res) => res.text()).then(async (data) => {
      let fileURL =  location.origin + '/uploads/'+JSON.parse(data).fileName;
      console.log(fileURL)
      return fileURL;
    })
  }
  
  const onSubmit = async (data) => {
    console.log(data)
    try {
      if(isEdit) {
        const uid = currentUser._id
        const adminId = user._id

        if((typeof data.avatar) !== 'string') {
          const fileURL = await fileUpload(data.avatar);
          data.avatar = fileURL
          await new Promise((resolve) => 
            resolve(dispatch(updateUser(uid, adminId, data)))
          )
        }else {
          await new Promise((resolve) => 
            resolve(dispatch(updateUser(uid, adminId, data)))
          )
        }
      }else {
        console.log(data)
        const fileURL = await fileUpload(data.avatar)
        data.avatar = fileURL
        await new Promise((resolve) => {
          resolve(dispatch(createUser(data)))
        })
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_DASHBOARD.admin.userManage.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatar',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 5.5, px: 3 }}>

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatar"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                alignItems: 'center'
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="E-mail" />
              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Role</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={selectedRole}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {roles.map((item) => (
                    (item.value==='admin') ? '' : 
                    <MenuItem
                      key={item.value}
                      value={item.value}
                      style={getStyles(item.value, selectedRole, theme)}
                    >
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
