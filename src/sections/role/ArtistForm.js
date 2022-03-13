import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux'
import { changeRole } from '../../redux/slices/role';
import { useRouter } from 'next/router';

// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
// @mui
import { Typography, Stack, Box } from '@mui/material'

// hooks
import { RHFSelect } from '../../components/hook-form'
// components
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField, RHFRadioGroup } from '../../components/hook-form'
import axios from '../../utils/axios';

const ArtistSchema = Yup.object().shape({
    category: Yup.string().required('Category required'),
    businessName: Yup.string().required('Business name required'),
    RSD: Yup.string().required('This field required'),
    bio: Yup.string().required('Bio is required'),
    websiteLink: Yup.string(),
    shopify: Yup.string(),
    soundCloud: Yup.string(),
    appleMusic: Yup.string(),
    youtube: Yup.string(),
    facebook: Yup.string(),
    instagram: Yup.string()
});

export function ArtistForm() {

    const { user, setRole } = useAuth();
    const { roles } = useSelector(state => state.role)
    const router = useRouter();
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const category = ["EOI Profile", "Upcoming", "Professional", "Major Artist"]

    const defaultValues = {
        category: '',
        businessName: '',
        RSD: 'DJ',
        bio: '',
        websiteLink: '',
        shopify: '',
        soundCloud: '',
        appleMusic: '',
        youtube:'',
        facebook:'',
        instagram:''
    };

    const methods = useForm({
        resolver: yupResolver(ArtistSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

      const onSubmit = async (data) => {
        await new Promise((resolve) => {
                resolve(
                    axios.post('/api/account/create-account', {
                        data,
                        role: 'artist',
                        uid: user._id
                    })
                    .then(res => {
                        try {
                            console.log(res)
                            setRole(res.data.user)
                            enqueueSnackbar(res.data.message, { variant: 'success' });
                            dispatch(changeRole(roles[0])) // roles[0] = 'artist'
                            router.push('/dashboard/artist')
                        }catch(error) {
                            enqueueSnackbar(res.error, { variant: 'error' });
                        }
                    })
                )
            }
        );
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {/* radio */}
            <Stack direction="row" sx={{ gap:0.5, mb:1.5 }}>
                <Typography variant="subtitle3" sx={{ color: 'grey.600' }}>What artist category do you think that are you applying for please note you may not yet currently be eligible</Typography>
                <Typography sx={{ color:'primary.main' }}>*</Typography>
            </Stack>
            <RHFRadioGroup name="category" options={category} row={true} />

            <Stack direction="row" sx={{ gap:0.5, my:2 }}>
                <Typography variant="subtitle3" sx={{ color: 'grey.600' }}>What is your brand, music artist, influencer or stage name. What do fans call you? This will be your company brand business name that is or will be registered </Typography>
                <Typography sx={{ color:'primary.main' }}>*</Typography>
            </Stack>
            <RHFTextField row name="businessName" label="" sx={{ mb:2 }} size="small" />

            <Typography variant="subtitle3" sx={{ color: 'grey.600' }}>Are you a Rapper, Singer or DJ?</Typography>
            <RHFSelect name="RSD" label="Select one" size="small" sx={{ my:3 }}>
                <option key={1} value="DJ">
                    DJ
                </option>
                <option key={2} value="rapper">
                    Rapper
                </option>
                <option key={3} value="singer">
                    Singer
                </option>
            </RHFSelect>

            <Typography variant="subtitle3" sx={{ color: 'grey.600', fontWeight: 400 }}>What artist category do you think that are you applying for please note you may not yet currently be eligible</Typography>
            <Box sx={{ my:2 }} />
            <Typography variant="subtitle3" sx={{ color: 'grey.600' }}>Profile Bio. Please tell us a little big about your self and music.</Typography>
            <RHFTextField name="bio" multiline rows={3} sx={{ mt:1, mb:3 }} />

            <RHFTextField name="websiteLink" label="Website Link" sx={{ mb:3 }} size="small" />
            <RHFTextField name="shopify" label="Shpify" sx={{ mb:3 }} size="small" />
            <RHFTextField name="soundCloud" label="Soundcould" sx={{ mb:3 }} size="small" />
            <RHFTextField name="appleMusic" label="Apple Music" sx={{ mb:3 }} size="small" />
            <RHFTextField name="youtube" label="Youtube" sx={{ mb:3 }} size="small" />
            <RHFTextField name="facebook" label="Facebook" sx={{ mb:3 }} size="small" />
            <RHFTextField name="instagram" label="instagram" sx={{ mb:3 }} size="small" />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit
            </LoadingButton>

        </FormProvider>
    )
}