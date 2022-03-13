import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Stack } from '@mui/material';
//
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    
  },
};

NavSectionArtist.propTypes = {
  navConfig: PropTypes.array,
};

function NavSectionArtist({ navConfig }) {

  return (
    <Stack direction="row">
      <Stack direction="row" sx={{ ...hideScrollbar, py: 1, gap:1 }}>
          {navConfig.map((list) => (
            <NavListRoot key={list.title} list={list} />
          ))}
      </Stack>
    </Stack>
  );
}

export default memo(NavSectionArtist);
