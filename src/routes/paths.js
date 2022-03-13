// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  forgetPassword: path(ROOTS_AUTH, '/forget-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  admin: {
    root: path(ROOTS_DASHBOARD, '/admin'),
    userManage: {
      root: path(ROOTS_DASHBOARD, '/admin/user'),
      permissions: path(ROOTS_DASHBOARD, '/admin/user/permissions'),
      list: path(ROOTS_DASHBOARD, '/admin/user/list'),
      newUser: path(ROOTS_DASHBOARD, '/admin/user/new'),
      roles: path(ROOTS_DASHBOARD, '/roles'),
      settings: path(ROOTS_DASHBOARD, '/settings'),
    },
    allMusic: {
      root: path(ROOTS_DASHBOARD, '/admin/allMusic'),
    },
    allMedia: {
      root: path(ROOTS_DASHBOARD, '/admin/allMedia'),
      videos: path(ROOTS_DASHBOARD, '/admin/allMedia'),
      audios: path(ROOTS_DASHBOARD, '/admin/allMedia'),
      ads: path(ROOTS_DASHBOARD, '/admin/ads'),
    },
    search: {
      root: path(ROOTS_DASHBOARD, '/admin/allMedia'),
      artists: path(ROOTS_DASHBOARD, '/admin/allMedia'),
      investors: path(ROOTS_DASHBOARD, '/admin/allMedia'),
      business: path(ROOTS_DASHBOARD, '/admin/ads'),
    }
  },
  investor: {
    root: path(ROOTS_DASHBOARD, '/investor'),
    messages: path(ROOTS_DASHBOARD, '/investor/messages'),
    followers: path(ROOTS_DASHBOARD, '/investor/followers'),
    followings: path(ROOTS_DASHBOARD, '/investor/followings'),
    investment: path(ROOTS_DASHBOARD, '/investor/investment'),
    earnings: path(ROOTS_DASHBOARD, '/investor/earnings'),
    listen: path(ROOTS_DASHBOARD, '/investor/listen'),
    watch: path(ROOTS_DASHBOARD, '/investor/watch'),
    profile: path(ROOTS_DASHBOARD, '/investor/profile'),
  },
  artist: {
    root: path(ROOTS_DASHBOARD, '/artist'),
    stockPrice: path(ROOTS_DASHBOARD, '/artist/stock-price'),
    create: path(ROOTS_DASHBOARD, '/artist/create'),
    messages: path(ROOTS_DASHBOARD, '/artist/messages'),
    followers: path(ROOTS_DASHBOARD, '/artist/followers'),
    followings: path(ROOTS_DASHBOARD, '/artist/followings'),
    revenue: path(ROOTS_DASHBOARD, '/artist/revenue'),
    upload: path(ROOTS_DASHBOARD, '/artist/upload'),
    audioTrack: path(ROOTS_DASHBOARD, '/artist/audioTrack'),
    myVideo: path(ROOTS_DASHBOARD, '/artist/myVideo'),
    promoted: path(ROOTS_DASHBOARD, '/artist/promoted'),
    connect: path(ROOTS_DASHBOARD, '/artist/connect'),
    academy: path(ROOTS_DASHBOARD, '/artist/academy'),
    profile: path(ROOTS_DASHBOARD, '/artist/profile'),
    investFriend: path(ROOTS_DASHBOARD, '/artist/investFriend'),
    audio: path(ROOTS_DASHBOARD, '/artist/audio'),
    video: path(ROOTS_DASHBOARD, '/artist/video'),
    posts: path(ROOTS_DASHBOARD, '/artist/posts'),
    photos: path(ROOTS_DASHBOARD, '/artist/photos'),
    bank: path(ROOTS_DASHBOARD, '/artist/bank'),
    collaborate: path(ROOTS_DASHBOARD, '/artist/collaborate'),
    invite: path(ROOTS_DASHBOARD, '/artist/invite'),
    store: path(ROOTS_DASHBOARD, '/artist/store'),
    subscriptions: path(ROOTS_DASHBOARD, '/artist/subscriptions'),
  },
  business: {
    root: path(ROOTS_DASHBOARD, '/business'),
    create: path(ROOTS_DASHBOARD, '/business/create'),
    messages: path(ROOTS_DASHBOARD, '/business/messages'),
    followers: path(ROOTS_DASHBOARD, '/business/followers'),
    followings: path(ROOTS_DASHBOARD, '/business/followings'),
    earnings: path(ROOTS_DASHBOARD, '/business/earnings'),
    services: path(ROOTS_DASHBOARD, '/business/services'),
    connect: path(ROOTS_DASHBOARD, '/business/connect'),
    progress: path(ROOTS_DASHBOARD, '/business/progress'),
    reviews: path(ROOTS_DASHBOARD, '/business/reviews'),
  },
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    stock: path(ROOTS_DASHBOARD, '/stock'),
    america: path(ROOTS_DASHBOARD, '/america'),
    africa: path(ROOTS_DASHBOARD, '/africa'),
    southAmerica: path(ROOTS_DASHBOARD, '/southAmerica'),
    asia: path(ROOTS_DASHBOARD, '/asia'),
    australia: path(ROOTS_DASHBOARD, '/australia'),
    euroup: path(ROOTS_DASHBOARD, '/euroup'),
  },
  buyVXD: {
    root: path(ROOTS_DASHBOARD, '/buyVXD')
  },
  market: {
    root: path(ROOTS_DASHBOARD, '/market')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey'),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),

  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice'),
  },
  
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
