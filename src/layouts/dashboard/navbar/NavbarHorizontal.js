import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// config
import { HEADER } from '../../../config';
// components
import { NavSectionHorizontal } from '../../../components/nav-section';
//
import { navHorizontalConfig } from './NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  transition: theme.transitions.create('top', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  alignSelf: 'center'
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {

  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={ navHorizontalConfig } />
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
