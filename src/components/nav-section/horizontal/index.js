import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Stack, Link } from '@mui/material';
//
import useResponsive from '../../../hooks/useResponsive';
import Image from '../../../components/Image';
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

NavSectionHorizontal.propTypes = {
  navConfig: PropTypes.array,
};

function NavSectionHorizontal({ navConfig }) {
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');

  return (
    isDesktop? 
    <Stack direction="row" sx={{ pl: 3 }}>
      <Stack direction="row" sx={{ ...hideScrollbar, py: 1, gap:1 }}>
          {navConfig.map((list) => (
            <NavListRoot key={list.title} list={list} />
          ))}
      </Stack>
    </Stack> : <Image src={isMobile?"/logo/valyou_x_small.png":"/logo/valyou_x_black_logo.svg"} sx={isMobile?{ width: '40px', mt:0.5 }:{ width: '160px', mt:0.5 }} alt="logo" />
  );
}

export default memo(NavSectionHorizontal);
