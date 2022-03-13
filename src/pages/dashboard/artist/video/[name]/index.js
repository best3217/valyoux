import {useSelector} from 'react-redux'
//mui
import { 
    Typography,
    Container
} from '@mui/material';
import Layout from '../../../../../layouts';
import Artist from '../../../../../layouts/dashboard/artist';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
//component
import Page from '../../../../../components/Page';


Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Index() {
    
    const { allArtists } = useSelector(state => state.user)
    const { query } = useRouter();
    const { name } = query;
    console.log(query);
    const currentArtist = allArtists.filter(artist => paramCase(artist.firstName + artist.lastName) === name)

    return(
        <Page title="Artist:Video">
            <Container>
                <Artist artist={currentArtist[0]} />
                <Typography variant="h3" sx={{ mt:4, textAlign: 'center' }}>This artist has not yet uploaded any video tracks!</Typography>
            </Container>
        </Page>
    )
}