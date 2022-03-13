import { useState } from 'react'
import {useSelector} from 'react-redux'
import { styled } from '@mui/material/styles';
//mui
import { 
    Typography, 
    Card, 
    Box,
    Stack,
    Container
} from '@mui/material';
import Layout from '../../../../../layouts';
import Artist from '../../../../../layouts/dashboard/artist';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
//component
import Page from '../../../../../components/Page';
import StockChart from '../../../../../components/chart/StockChart';


Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const BrandOverview = styled(Card)(({ theme }) => ({
    padding: '25px 30px',
    marginTop: '20px',
    maxWidth: '400px'
}));

export default function Index() {
    
    const { allArtists } = useSelector(state => state.user)
    const { query } = useRouter();
    const { name } = query;
    const currentArtist = allArtists.filter(artist => paramCase(artist.firstName + artist.lastName) === name)
    console.log(query)
    
    const [value, setValue] = useState('stock-price')
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return(
        <Page title="Artist:Stock">
            <Container>
                <Artist artist={currentArtist[0]} />
                <StockChart />
                <BrandOverview>
                    <Typography variant="h4" sx={{ mb:4, color: 'black' }}>Artist Brand Overview</Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb:3 }}>
                        <Box>
                            <Typography variant="h6" sx={{ mb:1 ,color: 'black' }}>Market Value</Typography>
                            <Typography sx={{ color: 'black' }}>$77,000,100</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ mb:1 ,color: 'black' }}>Available at Current Price</Typography>
                            <Typography sx={{ color: 'black' }}>0</Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb:3 }}>
                        <Box>
                            <Typography variant="h6" sx={{ mb:1 ,color: 'black' }}>Total Supply</Typography>
                            <Typography sx={{ color: 'black' }}>99,999,999</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ mb:1 ,color: 'black' }}>Circulating Supply</Typography>
                            <Typography sx={{ color: 'black' }}>1</Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb:3 }}>
                        <Box>
                            <Typography variant="h6" sx={{ mb:1 ,color: 'black' }}>Artist</Typography>
                            <Typography sx={{ color: 'black' }}>99.999999%</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ mb:1 ,color: 'black' }}>Music Fans Investors</Typography>
                            <Typography sx={{ color: 'black' }}>0.000001%</Typography>
                        </Box>
                    </Stack>
                </BrandOverview>
            </Container>
        </Page>
    )
}