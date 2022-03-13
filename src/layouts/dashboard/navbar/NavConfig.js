// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
//mui
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  stock: getIcon('is_stock'),
  social: getIcon('is_social'),
  watch: getIcon('is_watch'),
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navVerticalConfig = [
  // USER ROLE
  // ----------------------------------------------------------------------
  {
    subheader: 'dashboard',
    items: [
      {
        title: 'investor',
        path: PATH_DASHBOARD.investor.root,
        icon: ICONS.dashboard,
        children: [
          { title: 'messages', path: PATH_DASHBOARD.investor.messages },
          { title: 'followers', path: PATH_DASHBOARD.investor.followers },
          { title: 'followings', path:PATH_DASHBOARD.investor.followings },
          { title: 'Investments or Portfolio', path: PATH_DASHBOARD.investor.investment },
          { title: 'Earnings & Rewards', path: PATH_DASHBOARD.investor.earnings },
          { title: 'Sign / Invest in Music Artists', path:PATH_DASHBOARD.investor.earnings },
          { title: 'Listen & Earn', path: PATH_DASHBOARD.investor.listen },
          { title: 'Watch & Earn', path: PATH_DASHBOARD.investor.watch },
          { title: 'Profile Settings', path: PATH_DASHBOARD.investor.profile },
        ],
      },
      {
        title: 'business',
        path: PATH_DASHBOARD.business.root,
        icon: ICONS.dashboard,
        children: [
          { title: 'Messages', path: PATH_DASHBOARD.business.messages },
          { title: 'follwers', path: PATH_DASHBOARD.business.followers},
          { title: 'followings', path: PATH_DASHBOARD.business.followings},
          { title: 'earnings', path: PATH_DASHBOARD.business.earnings},
          { title: 'Services you provide', path: PATH_DASHBOARD.business.services},
          { title: 'Connect & Collaborate', path: PATH_DASHBOARD.business.connect },
          { title: 'Order in Progress', path: PATH_DASHBOARD.business.progress },
          { title: 'Reviews', path: PATH_DASHBOARD.business.reviews },
        ],
      },
      {
        title: 'artist',
        path: PATH_DASHBOARD.artist.root,
        icon: ICONS.dashboard,
        children: [
          { title: 'messages', path: PATH_DASHBOARD.artist.messages },
          { title: 'followers', path:PATH_DASHBOARD.artist.followers },
          { title: 'followings', path: PATH_DASHBOARD.artist.followings },
          { title: 'Revenue Streams', path: PATH_DASHBOARD.artist.revenue },
          { title: 'Upload', path:PATH_DASHBOARD.artist.upload },
          { title: 'My Audio Tracks', path: PATH_DASHBOARD.artist.audioTrack },
          { title: 'My Videos', path: PATH_DASHBOARD.artist.myVideo },
          { title: 'Promoted Songs', path: PATH_DASHBOARD.artist.promoted },
          { title: 'Connect & Collaborate', path: PATH_DASHBOARD.artist.connect },
          { title: 'Academy', path: PATH_DASHBOARD.artist.academy },
          { title: 'Profile Settings', path: PATH_DASHBOARD.artist.profile },
          { title: 'Invite Friends / Fans', path: PATH_DASHBOARD.artist.investFriend },
        ],
      },
      {
        title: 'admin',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.dashboard,
        children: [
          {
            title: 'user management',
            path: PATH_DASHBOARD.admin.userManage.root,
            icon: (<ManageAccountsIcon />),
            children: [
              { title: 'permissions', path: PATH_DASHBOARD.admin.userManage.permissions },
              { title: 'roles', path: PATH_DASHBOARD.admin.userManage.roles },
              { title: 'users', path: PATH_DASHBOARD.admin.userManage.list },
              { title: 'settings', path: PATH_DASHBOARD.admin.userManage.settings },
            ]
          },
          {
            title: 'All music Artists',
            path: PATH_DASHBOARD.admin.allMusic.root,
            icon: (<LibraryMusicIcon />),
          },
          {
            title: 'all media',
            path: PATH_DASHBOARD.admin.allMedia.root,
            icon: (<PermMediaIcon />),
            children: [
              { title: 'videos', path: PATH_DASHBOARD.admin.allMedia.videos },
              { title: 'audios', path: PATH_DASHBOARD.admin.allMedia.audios },
              { title: 'Promoted Ads', path: PATH_DASHBOARD.admin.allMedia.ads },
            ]
          },
          {
            title: 'Radar Search',
            path: PATH_DASHBOARD.admin.search.root,
            icon: (<PersonSearchIcon />),
            children: [
              { title: 'Artists', path: PATH_DASHBOARD.admin.search.artists },
              { title: 'Investors', path: PATH_DASHBOARD.admin.search.investors },
              { title: 'Business', path: PATH_DASHBOARD.admin.search.business },
            ]
          },
        ],
      },
    ]
  },

  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general menu',
    items: [
      { 
        title: 'Stock Market', 
        path: PATH_DASHBOARD.general.stock, 
        icon: ICONS.stock,
        children: [
          { title: 'America (North)', path: 'PATH_DASHBOARD.user.cards' },
          { title: 'Africa', path: 'PATH_DASHBOARD.user.list' },
          { title: 'South America', path: 'PATH_DASHBOARD.user.newUser' },
          { title: 'Asia', path: 'PATH_DASHBOARD.user.editById' },
          { title: 'Australia', path: 'PATH_DASHBOARD.user.account' },
          { title: 'Europe', path: 'PATH_DASHBOARD.user.account' },
        ],
      },
      // { 
      //   title: 'Bank', 
      //   path: 'PATH_DASHBOARD.general.ecommerce',
      //   icon: ICONS.ecommerce,
      //   children: [
      //     { title: 'Deposit', path: 'PATH_DASHBOARD.user.cards' },
      //     { title: 'Currency Exchange', path: 'PATH_DASHBOARD.user.list' },
      //     { title: 'Buy VXD Currency', path: 'PATH_DASHBOARD.user.newUser' },
      //     { title: 'Investment Portfolio', path: 'PATH_DASHBOARD.user.editById' },
      //     { title: 'VXD Orders', path: 'PATH_DASHBOARD.user.account' },
      //     { title: 'KYC Application', path: 'PATH_DASHBOARD.user.account' },
      //   ],
      // },
      // { title: 'Social Media Trading', path: 'PATH_DASHBOARD.general.banking', icon: ICONS.social },
      // { title: 'Watch', path: 'PATH_DASHBOARD.general.booking', icon: ICONS.watch },
      // { title: 'Listen', path: 'PATH_DASHBOARD.general.booking', icon: (<ArticleOutlinedIcon />) },
      // { 
      //   title: 'Search Radar', 
      //   path: 'PATH_DASHBOARD.general.analytics', 
      //   icon: ICONS.analytics,
      //   children: [
      //     { title: 'Artists', path: 'PATH_DASHBOARD.user.cards' },
      //     { title: 'Investors / Music Fans', path: 'PATH_DASHBOARD.user.list' },
      //     { title: 'Buy VXD Currency', path: 'PATH_DASHBOARD.user.newUser' },
      //     { title: 'Investment Portfolio', path: 'PATH_DASHBOARD.user.editById' },
      //     { title: 'VXD Orders', path: 'PATH_DASHBOARD.user.account' },
      //     { title: 'KYC Application', path: 'PATH_DASHBOARD.user.account' },
      //   ],
      // },
      // { 
      //   title: 'Store', 
      //   path: 'PATH_DASHBOARD.general.analytics', 
      //   icon: (<StorefrontOutlinedIcon />),
      //   children: [
      //     { title: 'Products', path: 'PATH_DASHBOARD.user.profile' }
      //   ],
      // },
      // { 
      //   title: 'Authencation', 
      //   path: 'PATH_DASHBOARD.general.analytics', 
      //   icon: (<AccountCircleOutlinedIcon />),
      //   children: [
      //     { title: 'ID Verification', path: 'PATH_DASHBOARD.user.profile' },
      //     { title: '2 Factor Authentication', path: 'PATH_DASHBOARD.user.profile' }
      //   ],
      // },
      // { title: 'Support', path: 'PATH_DASHBOARD.general.booking', icon: (<SupportAgentOutlinedIcon />) },
      // { title: 'Home', path: 'PATH_DASHBOARD.general.booking', icon: (<HomeOutlinedIcon />) },
    ],
  },
];

const navHorizontalConfig = [
  {
    title: 'Home',
    path: PATH_DASHBOARD.general.app
  },
  {
    title: 'Buy VXD',
    path: PATH_DASHBOARD.buyVXD.root
  },
  {
    title: 'Maket',
    path: PATH_DASHBOARD.market.root
  },
  {
    title: 'Social Media',
    path: 'PATH_DASHBOARD.general.app'
  },
  {
    title: 'Connect',
    path: 'PATH_DASHBOARD.general.app'
  },
  {
    title: 'Watch',
    path: 'PATH_DASHBOARD.general.app'
  },
  {
    title: 'Listen',
    path: 'PATH_DASHBOARD.general.app'
  },
  {
    title: 'Store',
    path: 'PATH_DASHBOARD.general.app'
  },
]

const artistConfig = [
  {
    title: 'Market',
    path: PATH_DASHBOARD.market.root
  },
  {
    title: 'Stock Price',
    path: PATH_DASHBOARD.artist.stockPrice
  },
  {
    title: 'Audio',
    path: PATH_DASHBOARD.artist.audio
  },{
    title: 'Video',
    path: PATH_DASHBOARD.artist.video
  },
  {
    title: 'Posts',
    path: PATH_DASHBOARD.artist.posts
  },
  {
    title: 'Followers',
    path: PATH_DASHBOARD.artist.followers
  },
  {
    title: 'Profile',
    path: PATH_DASHBOARD.artist.profile
  },
  {
    title: 'Photos',
    path: PATH_DASHBOARD.artist.photos
  },
  {
    title: 'Revenue',
    path: PATH_DASHBOARD.artist.revenue
  },
  {
    title: 'Bank',
    path: PATH_DASHBOARD.artist.bank
  },
  {
    title: 'Collaorate',
    path: PATH_DASHBOARD.artist.collaborate
  },
  {
    title: 'Invite',
    path: PATH_DASHBOARD.artist.invite
  },
  {
    title: 'Store',
    path: PATH_DASHBOARD.artist.store
  },
  {
    title: 'Subscriptions',
    path: PATH_DASHBOARD.artist.subscriptions
  },
  {
    title: 'Investment Deal',
    path: 'PATH_DASHBOARD.artist.followers'
  },
  {
    title: 'Academy',
    path: 'PATH_DASHBOARD.artist.followers'
  },
  {
    title: 'Dashboard',
    path: 'PATH_DASHBOARD.artist.followers'
  },
]

export  {
  navVerticalConfig,
  navHorizontalConfig,
  artistConfig
}
