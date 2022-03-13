
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
//mui
import { 
    Typography,
    Card,
    Stack,
    Box,
    Button,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import Image from './Image'
import Iconify from './Iconify'

const CardStyle = styled(Card)(({ theme }) => ({
    padding: '25px',
    marginTop: '40px',
    minHeight: '535px'
}));

Deal.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    balance: PropTypes.number,
    paid: PropTypes.boolean,
    logo: PropTypes.string,
    background: PropTypes.string,
    details: PropTypes.array,
  };

export default function Deal(data) {
    const {title, subTitle, balance, paid, logo, details, background} = data.data

    return(
        <CardStyle sx={{ background: background }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb:3 }}>
                <Box>
                    <Typography variant="h5">{title}</Typography>
                    <Typography variant="subtitle3">{subTitle}</Typography>
                </Box>
                <Image src={logo} sx={{ width: '40px', height: '40px' }} alt="logo" />
            </Stack>
            <Stack direction="row" alignItems="end" sx={{ gap:2, mb:2 }}>
                <Typography variant="h4" sx={{ lineHight: 1.25 }}>$ {balance}</Typography>
                <Typography> Investment Deal Contract</Typography>
            </Stack>
            {
                paid ? <Typography>(Paid by Sponsor or Investor)</Typography> : ''
            }
            
            <Box sx={{ textAlign: 'center', my:3 }}>
                <Button variant="contained" size="small" color="primary">Sign up now</Button>
            </Box>
            {
                details.map(detail => 
                    <List key={detail}>
                        <ListItem sx={{ alignItems: 'baseline', gap:1 }}>
                            <Iconify icon="mdi:square-circle" />
                            <ListItemText>
                                <Typography sx={{ fontSize: 15 }}>{detail}</Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                )
            }
        </CardStyle>
    )
}