// @mui
import { alpha, styled } from '@mui/material/styles';
import { Link, Popover } from '@mui/material';
// config
import { NAVBAR } from '../../../config';

// ----------------------------------------------------------------------

export const ListItemStyle = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem' && prop !== 'open',
})(({ activeRoot, activeSub, subItem, open, theme }) => {
  const isLight = theme.palette.mode === 'light';

  const activeRootStyle = {
    color: theme.primary,
    backgroundColor: theme.palette.common.white,
  };

  return {
    ...theme.typography.body2,
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    height: NAVBAR.DASHBOARD_ITEM_HORIZONTAL_HEIGHT,
    textUnderline: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
    // activeRoot
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      ...activeRootStyle,
      '&:hover': { ...activeRootStyle },
    }),
    // activeSub
    ...(activeSub && {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
    }),
    // subItem
    ...(subItem && {
      width: '100%',
      margin: 0,
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
      justifyContent: 'space-between',
    }),
    // open
    ...(open &&
      !activeRoot && {
        color: theme.palette.text.primary,
      }),
  };
});

// ----------------------------------------------------------------------

export const PaperStyle = styled(Popover)(({ theme }) => ({
  pointerEvents: 'none',
  '& .MuiPopover-paper': {
    width: 160,
    pointerEvents: 'auto',
    padding: theme.spacing(1),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    boxShadow: theme.customShadows.dropdown,
  },
}));
