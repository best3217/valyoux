import {useSelector} from 'react-redux'
//mui
import { styled } from '@mui/material/styles';
import { 
    Typography,
    Stack,
    Container,
    Box
} from '@mui/material';
import Layout from '../../../../../layouts';
import Artist from '../../../../../layouts/dashboard/artist';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
//component
import Page from '../../../../../components/Page';

const ContentStyle = styled('div')(({ theme }) => ({
    padding: '20px',
    maxWidth: '900px',
    margin: 'auto'
}));

Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Index() {

    const { allArtists } = useSelector(state => state.user)
    const { query } = useRouter();
    const { name } = query;
    const currentArtist = allArtists.filter(artist => paramCase(artist.firstName + artist.lastName) === name)

    return(
        <Page title="Artist:Photos">
            <Container>
                <Artist artist={currentArtist[0]} />
                <ContentStyle>
                    <Stack direction="row" justifyContent="space-between" sx={{ mt:4, mb:7 }}>
                        <Typography variant='h3' sx={{ textTransform: 'uppercase' }}>Totoal Revenue Gernerated</Typography>
                        <Typography variant='h3'>$ 0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7 }}>
                        <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>SONG WRITING & COMPOSING REVENUE</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Publisher Advance payment</Typography>
                            <Typography variant='subtitle3'>Payments to songwriter / composer as part of a publishing deal. Paid to songwriter/composer by publishing company.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Mechanical Royalties</Typography>
                            <Typography variant='subtitle3'>Royalties generated through the Commissionsreproduction of recordings of your songs – either physical or digital. Paid to songwriter / composer by publisher, label, Harry Fox, or digital aggregator like CD Baby/TuneCore.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Streaming Mechanical Royalties</Typography>
                            <Typography variant='subtitle3'>Royalties generated when your songs are streamed on on-demand services (Rhapsody, Spotify, Rdio). Paid to publisher by Harry Fox or other mechanical licensing agent. Publisher then pays songwriter/composer.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Composing Original Works for Broadcast</Typography>
                            <Typography variant='subtitle3'>Typically a commercial request to compose an *original* jingle, soundtrack, score, or other musical work for a film, TV or cable show, or an ad agency. Paid to songwriter/composer by agency requesting the work.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Synch Licenses</Typography>
                            <Typography variant='subtitle3'>Typically involves licensing an *existing* work for use in a movie, documentary, TV, video games, internet, or a commercial. Paid to songwriters/composers either via publisher or record label, or via a direct licensing deal with the licensee (movie studio, ad agency, etc) if you are self- published.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Sheet Music Sales</Typography>
                            <Typography variant='subtitle3'>Revenue generated by the sale or licensed reproduction of songs/compositions as sheet music. Paid to songwriter/composer by publisher, or directly from purchasers if you are selling it on your website or at performances.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Lyric Display</Typography>
                            <Typography variant='subtitle3'>Revenue generated by the licensed display of song lyrics. Online lyric sites pay publishers, which then pay songwriter/composer.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Ringtones</Typography>
                            <Typography variant='subtitle3'>Revenue generated from licensing your songs/compositions for use as ringtones. Paid to songwriter/composer via your publisher, your label or Harry Fox.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Songwriter Awards Programs</Typography>
                            <Typography variant='subtitle3'>Awards given by ASCAP and BMI Foundations to writer members of any genre whose performances are primarily in venues outside of broadcast media.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Pulishber Settlement</Typography>
                            <Typography variant='subtitle3'>Payment from publishers to writers for litigation settlements.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Record Label Support</Typography>
                            <Typography variant='subtitle3'>Record Label Support</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Retail Sales</Typography>
                            <Typography variant='subtitle3'>Revenue generated from selling physical recordings in retail stores or via mailorder. Paid to recording artist/performer by your label, or services like CD Baby or Bandcamp that help musicians sell physical product.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Digital Sales</Typography>
                            <Typography variant='subtitle3'>Revenue generated from selling recordings digitally/online as permanent downloads. Paid to recording artist/performer by your label, or digital aggregator like CD Baby or TuneCore, or directly from fans via services like Bandcamp.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb:7, gap:5 }}>
                        <Box>
                            <Typography variant='h4' sx={{ textTransform: 'uppercase' }}>Sales at Shows</Typography>
                            <Typography variant='subtitle3'>Revenue generated from selling recordings at shows/live performances. Paid to recording artist/performer directly by fans.</Typography>
                        </Box>
                        <Typography variant='h4'>$0.0000</Typography>
                    </Stack>
                </ContentStyle>
            </Container>
        </Page>
    )
}