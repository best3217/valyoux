import {useSelector} from 'react-redux'
//mui
import { 
    Typography,
    Container,
    Grid
} from '@mui/material';
import Layout from '../../../../../layouts';
import Artist from '../../../../../layouts/dashboard/artist';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
//component
import Page from '../../../../../components/Page';
import Deal from '../../../../../components/Deal';
import Deals from './deals'


Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Index() {

    const { allArtists } = useSelector(state => state.user)
    const { query } = useRouter();
    const { name } = query;
    const currentArtist = allArtists.filter(artist => paramCase(artist.firstName + artist.lastName) === name)

    return(
        <Page title="Artist:Subscription">
            <Container>
                <Artist artist={currentArtist[0]} />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
                {
                    Deals.map(deal => 
                        <Grid key={deal.title} item xs={4} md={4}>
                            <Deal data={deal} />
                        </Grid>
                    )
                }
                </Grid>    
            </Container>
        </Page>
    )
}