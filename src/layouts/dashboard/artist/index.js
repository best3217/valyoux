import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, Stack } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// components
import Avatar from '../../../components/Avatar';
import Image from '../../../components/Image';
import NavbarArtist from "../navbar/NavbarArtist"
import createAvatar from '../../../utils/createAvatar';

const RootStyle = styled(Card)(({ theme }) => ({
    padding: '20px',
    marginTop: '20px'
}));

const InfoStyle = styled('div')(({ theme }) => ({
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      gap: '100px'
    },
}));

Index.propTypes = {
    currentArtist: PropTypes.object,
};

export default function Index (currentArtist) {
    const {artist} = currentArtist;

    return (
        <>
            <NavbarArtist />
            <RootStyle>
                <InfoStyle>
                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ gap:2  }}>
                        <Avatar
                            src={artist?.avatar}
                            alt={artist?.firstName}
                            color={artist?.avatar ? 'default' : createAvatar(artist?.firstName).color}
                            sx={{ 
                                borderColor: 'common.white',
                                width: { xs: 80, md: 128 },
                                height: { xs: 80, md: 128 },
                            }}
                        />
                        <Box
                            sx={{
                                ml: { md: 3 },
                                mt: { xs: 1, md: 0 },
                                color: 'common.white',
                                textAlign: { xs: 'center', md: 'left' },
                            }}
                        >
                            <Typography variant="h4" sx={{ color: 'black' }}>{artist?.firstName + artist?.lastName}</Typography>
                            <Typography sx={{ color: 'black', textTransform: 'capitalize', opacity: 0.72 }}>{artist.data.RSD}</Typography>
                            <Typography sx={{ color: 'black', textTransform: 'capitalize', opacity: 0.72 }}>{artist.data.category}</Typography>
                        </Box>
                    </Stack>
                    <Box
                        sx={{
                            ml: { md: 3 },
                            mt: { xs: 1, md: 0 },
                            color: 'common.white',
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        <Typography sx={{ color: 'black', mb: 2.5, textTransform: 'capitalize', opacity: 0.72 }}>Market Value</Typography>
                        <Typography variant="h4" sx={{ color: 'black' }}>$ 77,000,100</Typography>
                    </Box>
                </InfoStyle>
            </RootStyle>
        </>
    )
}