
import { useState } from 'react'
import { Typography, Card,Box, ToggleButtonGroup, ToggleButton, Stack, Button } from '@mui/material';
import Layout from '../../layouts';
import { styled } from '@mui/material/styles';
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import Image from '../../components/Image'

BuyVXD.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const ContentStyle = styled(Card)(({ theme }) => ({
    borderRadius: '5px',
    marginTop: '20px',
    padding: '20px'
}));

const RootStyle = styled(Box)(() => ({
    padding: '20px'
}));

const PaymentSection = styled(ToggleButtonGroup)(({theme}) => ({
    width: '100%',
    border: 'none',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
        display: 'block',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    '&.MuiToggleButton-root': {
        border: '1px solid red'
    }
}));

const Payment = styled(ToggleButton)(() => ({
    width: '100%',
    border: '1px solid red',
    fontSize: 12,
    whiteSpace: 'nowrap'
}));

export default function BuyVXD() {

    const [payment, setPayment] = useState('credit');

    const paymentSchema = Yup.object().shape({
        payment: Yup.string().required('Name is required'),
        budget: Yup.string().required('Name is required')
      });

      const defaultValues = {
        payment: '',
        budget: '',
    };

    const methods = useForm({
        resolver: yupResolver(paymentSchema),
        defaultValues,
    });
    
    const {
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

    return (
        <RootStyle>
            <Typography variant="h4" sx={{ fontSize:20, color:''}}>Payment method</Typography>
            <ContentStyle>
                <Typography variant="subtitle1" mb={4} color="">Crypto Payment Accepted Only</Typography>
                <Box>
                    <Box sx={{ mb:1 }}>
                        <Typography variant="subtitle3">Payment method :</Typography>
                    </Box>
                    <Box sx={{ mb:1 }}>
                        <Typography variant="subtitle3">Your account will be credited in VXD</Typography>
                    </Box>
                    <FormProvider methods={methods}>
                        <PaymentSection
                            color="primary"
                            value={payment}
                            exclusive
                            variant="contained"
                            onChange={(event, value) => setPayment(value) }
                        >
                            <Payment color="primary" value="credit">
                                <Image src="/icons/mastercard_icon.svg"  alt="mastercard" sx={{ width: '40px', mr:1 }} />Credit / Debit Card
                            </Payment>
                            <Payment value="paypal">
                                <Image src="/icons/paypal_icon.png"  alt="paypal" sx={{ width: '30px', mr:1 }} />
                                Paypal
                            </Payment>
                            <Payment value="bitcoin">
                                <Image  src="/icons/bitcoin_icon.jpg" alt="bitcoin" sx={{ width: '30px', mr:1 }} />
                                    BitCoin
                                </Payment>
                            <Payment value="ethereum">
                                <Image src="/icons/ethereum_icon.png" alt="ethereum" sx={{ width: '30px', mr:1 }} />
                                Ethereum
                            </Payment>
                            <Payment value="usdc">
                                <Image src="/icons/usdc_icon.png" alt="usdc" sx={{ width: '30px', mr:1 }} />
                                USDC
                            </Payment>
                            <Payment value="vxd">
                                <Image src="/logo/valyou_x_small.png" alt="vxd" sx={{ width: '30px', mr:1 }} />
                                VXD
                            </Payment>
                        </PaymentSection>

                        <Typography variant="subtitle3">Conversion</Typography>
                        <Stack direction="row" alignItems="center" sx={{ mt:1 }}>
                            <RHFSelect name="crypto" size="small" sx={{ width: '250px' }}>
                                <option value="bitcoin">Bitcoin</option>
                                <option value="ethereum">Ethereum</option>
                            </RHFSelect>
                            <RHFTextField name="conversion" size="small" />
                            <RHFSelect name="amount" size="small" sx={{ width: '250px' }}>
                                <option value="usd">USD Amount</option>
                                <option value="ethereum">Ethereum</option>
                            </RHFSelect>
                        </Stack>
                        <Box sx={{ textAlign: 'center', mt:2 }}>
                            <Button variant="contained" color="secondary" sx={{ textTransform: 'uppercase' }}>Stock</Button>
                        </Box>
                    </FormProvider>

                </Box>
            </ContentStyle>
        </RootStyle>
    )
}