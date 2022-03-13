import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import { NavSectionArtist } from '../../../components/nav-section';
//
import { artistConfig } from './NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  alignSelf: 'center'
}));

// ----------------------------------------------------------------------

function NavbarArtist() {

  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionArtist navConfig={ artistConfig } />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarArtist);
