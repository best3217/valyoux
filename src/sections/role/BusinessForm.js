import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
// @mui
import { Typography } from '@mui/material'

// hooks
import { RHFSelect } from '../../components/hook-form'
// components
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../../components/hook-form'
import BusinessConfig from './businessConfig'
import axios from '../../utils/axios';
//redux
import { changeRole } from '../../redux/slices/role';

const BusinessSchema = Yup.object().shape({
    businessType: Yup.string().required('Business type required'),
    stageName: Yup.string().required('This field name required'),
    occupation: Yup.string().required('This field required'),
    purpose: Yup.string().required('This field is required'),
    websiteLink: Yup.string(),
    instagram: Yup.string(),
    facebook: Yup.string(),
    twitter: Yup.string(),
    youtube: Yup.string(),
    otherLink: Yup.string()
});

export function BusinessForm() {

    const { user, setRole } = useAuth();
    const { roles } = useSelector(state => state.role)
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const dispatch = useDispatch();

    const defaultValues = {
        businessType: 'A&R Administrator',
        stageName: '',
        occupation: '',
        purpose: '',
        websiteLink: '',
        instagram:'',
        facebook: '',
        twitter: '',
        youtube:'',
        otherLink:'',
      };

    const methods = useForm({
        resolver: yupResolver(BusinessSchema),
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
                    role: 'business',
                    uid: user._id
                })
                .then(res => {
                    try {
                        setRole(res.data.user)
                        enqueueSnackbar(res.data.message, { variant: 'success' });
                        dispatch(changeRole(roles[1])) // roles[1] = 'business'
                        router.push('/dashboard/business')
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

            <Typography variant="subtitle3" sx={{ color: 'grey.600' }}>What type of business account would you like to create?</Typography>
            <RHFSelect name="businessType" label="Select your Business Type" size="small" sx={{ my:3 }}>
                {
                    BusinessConfig.map((option, i) => <option key={i} value={option}>{option}</option>)
                }
            </RHFSelect>

            <Typography variant="subtitle3" sx={{ color: 'grey.600' }}>What is your brand, music artist, influencer or stage name. What do fans call you? This will be your company brand business name that is or will be registered .</Typography>
            <RHFTextField name="stageName" sx={{ mt:1, mb:3 }} size="small" />

            <Typography variant="subtitle3" sx={{ color: 'grey.600' }}>What is you occupation, business role, example Music manager, tour promoter, photographer, video director, designer, songwriter, model, actor</Typography>
            <RHFTextField name="occupation" sx={{ mt:1, mb:3 }} size="small" />

            <Typography variant="subtitle3" sx={{ color: 'grey.600' }}>About your business - What is the purpose of your business or services you provide words 250 words</Typography>
            <RHFTextField name="purpose" multiline rows={3} sx={{ mt:1, mb:3 }} />

            <RHFTextField name="websiteLink" label="Website Link" sx={{ mb:3 }} size="small" />
            <RHFTextField name="instagram" label="instagram" sx={{ mb:3 }} size="small" />
            <RHFTextField name="facebook" label="Facebook" sx={{ mb:3 }} size="small" />
            <RHFTextField name="twitter" label="Twitter" sx={{ mb:3 }} size="small" />
            <RHFTextField name="youtube" label="Youtube" sx={{ mb:3 }} size="small" />
            <RHFTextField name="otherLink" label="otherLink" sx={{ mb:3 }} size="small" />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit
            </LoadingButton>

        </FormProvider>
    )
}