import Page from "../../../components/Page"
//mui
import { styled } from '@mui/material/styles';
import { Container, Card, Typography } from "@mui/material"
//layout
import Layout from "../../../layouts";
//section
import { ArtistForm } from "../../../sections/role/ArtistForm";

const SectionStyle = styled(Card)(({ theme }) => ({
    maxWidth: 750,
    borderRadius: '0.25rem',
    boxShadow: '0 1.5px 4px 0 rgba(0,0,0,.3)',
    padding: theme.spacing(3),
  }));

// ----------------------------------------------------------------------

create.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function create() {
    return(
        <Page title="Artist Create">
            <Container>
                <Typography variant="subtitle1" sx={{ color:'primary.main', textTransform: 'uppercase', mb:2 }}>create artist</Typography>
                <SectionStyle>
                    <ArtistForm />
                </SectionStyle>
            </Container>
        </Page>
    )
}