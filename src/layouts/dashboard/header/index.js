import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Badge } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import AccountPopover from './AccountPopover';
import RolePopover from './RolePopover';
import WalletPopover from './WalletPopover';
import NotificationsPopover from './NotificationsPopover';
import NavbarHorizontal from '../navbar/NavbarHorizontal';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <NavbarHorizontal />
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
          {/* <LanguagePopover /> */}
            <Stack direction="row" alignItems="center" sx={{ gap:1.5 }}> 
            
              <WalletPopover />

              <IconButtonAnimate>
                <Badge badgeContent={3} color="error">
                  <EmailOutlinedIcon />
                </Badge>
              </IconButtonAnimate>

              <NotificationsPopover />

              <RolePopover />

              <AccountPopover />

            </Stack>
            {!isDesktop && (
              <IconButtonAnimate onClick={onOpenSidebar} sx={{ mx: 1, color: 'text.primary' }}>
                <Iconify icon="eva:menu-2-fill" />
              </IconButtonAnimate>
            )}
      </Toolbar>
    </RootStyle>
  );
}
