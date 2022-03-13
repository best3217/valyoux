import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
//mui
import { 
    Typography,
    Card,
    Stack,
    Box
} from '@mui/material';
import Image from './Image'
import Iconify from './Iconify'

Bank.propTypes = {
    title: PropTypes.string,
    balance: PropTypes.number,
    currency: PropTypes.string,
    sx: PropTypes.object,
    src: PropTypes.string
};

const BankCard = styled(Card)(({ theme }) => ({
    minHeight: '100px'
}));

export default function Bank(props) {
    const { title, balance, currency, sx, src } = props
    return(
        <BankCard sx={{ p:4, ...sx }}>
            <Stack direction="row" alignItems="center" sx={{ gap:2 }}>
                <Image  src={src} alt="bitcoin" sx={{ width: '50px', mr:1 }} />
                <Box>
                    <Typography variant="subtitle3">{title}</Typography><Iconify sx={{ verticalAlign: 'middle', ml:1 }} icon="mdi:alert-circle" />
                    <Stack direction="row" sx={{ gap:0.5, mt:1 }}>
                        <Typography variant="subtitle1">{balance} {currency} </Typography>
                        <Typography variant="subtitle3">= $ 9148.00</Typography>
                    </Stack>
                </Box>
            </Stack>
        </BankCard>
    )
}