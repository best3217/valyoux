import { useState } from 'react'
import {useSelector} from 'react-redux'
//mui
import { 
    Typography,
    Card,
    Stack,
    Box,
    Tabs, 
    Tab,
    Container
} from '@mui/material';
import PropTypes from 'prop-types';
import Layout from '../../../../../layouts';
import Artist from '../../../../../layouts/dashboard/artist';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
//component
import Page from '../../../../../components/Page';


Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

export default function Index() {
    
    const [value, setValue] = useState('all');
    const { allArtists } = useSelector(state => state.user)
    const { query } = useRouter();
    const { name } = query;
    const currentArtist = allArtists.filter(artist => paramCase(artist.firstName + artist.lastName) === name)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return(
        <Page title="Artist:Followers">
            <Container>
                <Artist artist={currentArtist[0]} />
                <Card sx={{ my:3, px:4, py:3 }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Box sx={{ textAlign: 'center', px:8}}>
                            <Typography variant="h6">Artists</Typography>
                            <Typography variant="subtitle">0</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', px:8 }}>
                            <Typography variant="h6">Investors</Typography>
                            <Typography variant="subtitle">0</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', px:8 }}>
                            <Typography variant="h6">Business</Typography>
                            <Typography variant="subtitle">0</Typography>
                        </Box>
                    </Stack>
                </Card>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    sx={{ px:2, mb:2 }}
                    >
                    <Tab sx={{ px:2 }} label="Followers(0)" {...a11yProps(0)} />
                    <Tab sx={{ px:2 }} label="Followings(0)" {...a11yProps(1)} />
                    <Tab sx={{ px:2 }} label="VIP(0)" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    Nothing yet to show !
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Nothing yet to show !
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Nothing yet to show !
                </TabPanel>
            </Container>
        </Page>
    )
}