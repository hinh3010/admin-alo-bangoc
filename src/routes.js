import { version } from './config';

export const homeRoutes = {
  name: 'Home',
  to: '/',
  exact: true,
  icon: 'chart-pie',
  children: [
    {
      to: '/',
      name: 'Dashboard',
      exact: true
    },
    // { to: '/dashboard-alt', name: 'Dashboard alt' },
    // { to: '/feed', name: 'Feed', exact: true },
    // { to: '/landing', name: 'Landing' }
  ]
};

export const authenticationRoutes = {
  name: 'Login',
  to: '/login',
  icon: 'lock',
  // children: [
  //   {
  //     to: '/authentication/basic',
  //     name: 'Basic',
  //     children: [
  //       { to: '/login', name: 'Login' },
  //       { to: '/authentication/basic/logout', name: 'Logout' },
  //       { to: '/authentication/basic/register', name: 'Register' },
  //       { to: '/authentication/basic/forget-password', name: 'Forgot password' },
  //       { to: '/authentication/basic/password-reset', name: 'Reset password' },
  //       { to: '/authentication/basic/confirm-mail', name: 'Confirm mail' },
  //       { to: '/authentication/basic/lock-screen', name: 'Lock screen' }
  //     ]
  //   },
  //   {
  //     to: '/authentication/card',
  //     name: 'Card',
  //     children: [
  //       { to: '/authentication/card/login', name: 'Login' },
  //       { to: '/authentication/card/logout', name: 'Logout' },
  //       { to: '/authentication/card/register', name: 'Register' },
  //       { to: '/authentication/card/forget-password', name: 'Forgot password' },
  //       { to: '/authentication/card/password-reset', name: 'Reset password' },
  //       { to: '/authentication/card/confirm-mail', name: 'Confirm mail' },
  //       { to: '/authentication/card/lock-screen', name: 'Lock screen' }
  //     ]
  //   },
  //   {
  //     to: '/authentication/split',
  //     name: 'Split',
  //     children: [
  //       { to: '/authentication/split/login', name: 'Login' },
  //       { to: '/authentication/split/logout', name: 'Logout' },
  //       { to: '/authentication/split/register', name: 'Register' },
  //       { to: '/authentication/split/forget-password', name: 'Forgot password' },
  //       { to: '/authentication/split/password-reset', name: 'Reset password' },
  //       { to: '/authentication/split/confirm-mail', name: 'Confirm mail' },
  //       { to: '/authentication/split/lock-screen', name: 'Lock screen' }
  //     ]
  //   },
  //   {
  //     to: '/authentication/wizard',
  //     name: 'Wizard'
  //   }
  // ]
};

export const gamesRoutes = {
  name: 'Games',
  to: '/games',
  icon: ['fab', 'hotjar'],
  children: [
    { to: '/games', name: 'List' },
    { to: '/games/create', name: 'Create' },
  ]
};


export const usersRoutes = {
  name: 'Users',
  to: '/users',
  icon: 'copy',
  children: [
    { to: '/users', name: 'List' },
  ]
};

export const stickerRoutes = {
  name: 'Sticker',
  to: '/sticker',
  icon: 'plug',
  exact: true,
  children: [
    { to: '/sticker', name: 'List', exact: true, },
    { to: '/sticker/add', name: 'Create', exact: true, },
  ]
};

export const backgroundChatRoutes = {
  name: 'Background Chat',
  to: '/backgroundChat',
  icon: 'plug',
  exact: true,
  children: [
    { to: '/backgroundChat', name: 'List', exact: true, },
    { to: '/backgroundChat/add', name: 'Create', exact: true, },
  ]
};

export const bannerRoutes = {
  name: 'Banner',
  to: '/banner',
  icon: 'plug',
  exact: true,
  children: [
    { to: '/banner', name: 'List', exact: true, },
    { to: '/banner/add', name: 'Create', exact: true, },
  ]
};

export const backgroundPostRoutes = {
  name: 'Background Post',
  to: '/backgroundPost',
  icon: 'plug',
  exact: true,
  children: [
    { to: '/backgroundPost', name: 'List', exact: true, },
    { to: '/backgroundPost/add', name: 'Create', exact: true, },
  ]
};

export const RuleRoutes = {
  name: 'Chính sách điều khoản',
  to: '/rule',
  icon: 'plug',
  exact: true,
  children: [
    { to: '/rule', name: 'List', exact: true, },
    { to: '/rule/add', name: 'Create', exact: true, },
  ]
};

export const badgeRoutes = {
  name: 'Badge',
  to: '/badge',
  icon: ['fab', 'hotjar'],
  children: [
    { to: '/badge', name: 'List' },
    { to: '/badge/create', name: 'Create' },
  ]
};

export const menuIconRoutes = {
  name: 'MenuIcon',
  to: '/menu-icon',
  icon: 'copy',
  children: [
    { to: '/menu-icon', name: 'List' },
    { to: '/menu-icon/create', name: 'Create' },
  ]
};

export const censorRoutes = {
  name: 'Kiểm duyệt',
  to: '/censor',
  icon: ['fab', 'trello'],
  children: [
    { to: '/censor', name: 'Danh sách' },
    { to: '/censor/list-notification', name: 'Thông báo chờ duyệt' },
    { to: '/censor/list-gift', name: 'Hộp quà chờ duyệt' },
    { to: '/censor/info', name: 'Chi tiết' },
  ]
};

export const companionRoutes = {
  name: 'Nhà đồng hành',
  to: '/companion',
  icon: 'copy',
  children: [
    { to: '/companion', name: 'Danh sách' },
    { to: '/companion/info', name: 'Chi tiết' },
  ]
};

export const developmentTeamRoutes = {
  name: 'Đội ngũ phát triển mạng xã hội Vdiarybook',
  to: '/companion',
  icon: 'copy',
  children: [
    { to: '/companion', name: 'Danh sách' },
    { to: '/companion/info', name: 'Chi tiết' },
  ]
};

export const postsRoutes = {
  name: 'Bài viết',
  to: '/post',
  icon: 'copy',
  children: [
    { to: '/posts', name: 'Danh sách' },
    { to: '/posts/category', name: 'Danh mục bài viết' },
    { to: '/posts/chart', name: 'Biểu đồ' },
    { to: '/posts/report', name: 'Bài bị báo cáo' },
    { to: '/background-post', name: 'Background bài viết' },
    { to: '/background-post/create', name: 'Tạo Background' },
    { to: '/reaction-activity', name: 'Cảm xúc hoạt động' },
    { to: '/reaction-activity/create', name: 'tạo cảm xúc' },
  ]
};

export const groupRoutes = {
  name: 'Nhóm',
  to: '/groups',
  icon: 'copy',
  children: [
    { to: '/groups', name: 'Danh sách' },
    // { to: '/post/category', name: 'Danh mục bài viết' },
  ]
};

export const newpageRoutes = {
  name: 'Pages',
  to: '/manage-pages',
  icon: 'copy',
  children: [
    { to: '/manage-pages', name: 'Danh sách' },
    // { to: '/post/category', name: 'Danh mục bài viết' },
  ]
};

export const emailRoutes2 = {
  name: 'Email',
  to: '/email',
  icon: 'copy',
  children: [
    { to: '/email', name: 'Email template' },
    // { to: '/post/category', name: 'Danh mục bài viết' },
  ]
};

export const policyRoutes = {
  name: 'Chính sách',
  to: '/policy',
  icon: 'copy',
  children: [
    { to: '/policy', name: 'Danh sách' },
    // { to: '/post/category', name: 'Danh mục bài viết' },
  ]
};

export const identifierRoutes = {
  name: 'Định danh',
  to: '/identifier',
  icon: 'puzzle-piece',
  children: [
    { to: '/identifier', name: 'Danh sách' },
    // { to: '/post/category', name: 'Danh mục bài viết' },
  ]
};

export const provineRoutes = {
  name: 'Danh sách tỉnh',
  to: '/province',
  icon: 'copy',
  children: [
    { to: '/province', name: 'Danh sách' },
    // { to: '/post/category', name: 'Danh mục bài viết' },
  ]
};

export const notificationRoutes = {
  name: 'Thông báo hệ thống',
  to: '/notification',
  icon: 'copy',
  children: [
    { to: '/notification', name: 'Danh sách' },
    { to: '/notification/create', name: 'Tạo thông báo' },
  ]
};

export const giftRoutes = {
  name: 'Quà tặng',
  to: '/gift',
  icon: 'copy',
  children: [
    { to: '/gift', name: 'Danh sách' },
    { to: '/gift/create', name: 'Tạo quà tặng' },
  ]
};


export const mediaSystemRoutes = {
  name: 'Media System',
  to: '/media-system',
  icon: 'copy',
  children: [
    { to: '/media-system', name: 'List' },
    { to: '/media-system/create', name: 'Create' },
  ]
};

export const ECommerceRoutes = {
  name: 'E commerce',
  to: '/e-commerce',
  icon: 'cart-plus',
  children: [
    { to: '/e-commerce/products/list', name: 'Product list' },
    { to: '/e-commerce/products/grid', name: 'Product grid' },
    { to: '/e-commerce/product-details', name: 'Product details' },
    { to: '/e-commerce/orders', name: 'Orders' },
    { to: '/e-commerce/order-details', name: 'Order details' },
    { to: '/e-commerce/customers', name: 'Customers' },
    { to: '/e-commerce/shopping-cart', name: 'Shopping cart' },
    { to: '/e-commerce/checkout', name: 'Checkout' },
    { to: '/e-commerce/favourite-items', name: 'Favourite items' }
  ]
};

export const pageRoutes = {
  name: 'Pages',
  to: '/pages',
  icon: 'game-board',
  children: [
    { to: '/pages/activity', name: 'Activity' },
    { to: '/pages/associations', name: 'Associations' },
    { to: '/pages/billing', name: 'Billing' },
    { to: '/pages/customer-details', name: 'Customer details' },
    { to: '/pages/event-detail', name: 'Event detail' },
    { to: '/pages/event-create', name: 'Event create' },
    { to: '/pages/events', name: 'Events' },
    { to: '/pages/faq', name: 'Faq' },
    {
      to: '/pages/games',
      name: 'Game',
      children: [{ to: '/pages/games', name: 'List game' }, { to: '/pages/games/create', name: 'Create game' }]
    },
    { to: '/pages/invoice', name: 'Invoice' },
    { to: '/pages/invite-people', name: 'Invite people' },
    { to: '/pages/notifications', name: 'Notifications' },
    { to: '/pages/people', name: 'People' },
    { to: '/pages/pricing', name: 'Pricing' },
    { to: '/pages/pricing-alt', name: 'Pricing alt' },
    { to: '/pages/profile', name: 'Profile' },
    { to: '/pages/settings', name: 'Settings' },
    { to: '/pages/starter', name: 'Starter' },
    {
      to: '/errors',
      name: 'Errors',
      children: [{ to: '/errors/404', name: '404' }, { to: '/errors/500', name: '500' }]
    }
  ]
};
export const widgetsRoutes = {
  name: 'Widgets',
  to: '/widgets',
  exact: true,
  icon: 'poll'
};

export const calenderRoutes = {
  name: 'Calendar',
  to: '/calendar',
  exact: true,
  icon: 'calendar-alt'
};

export const chatRoutes = {
  name: 'Chat',
  to: '/chat',
  exact: true,
  icon: 'comments'
};

export const kanbanRoutes = {
  name: 'Kanban',
  to: '/kanban',
  exact: true,
  icon: ['fab', 'trello']
};

export const emailRoutes = {
  name: 'Email',
  to: '/email',
  icon: 'envelope-open',
  children: [
    { to: '/email/inbox', name: 'Inbox' },
    { to: '/email/email-detail', name: 'Email detail' },
    { to: '/email/compose', name: 'Compose' }
  ]
};

export const documentationRoutes = {
  name: 'Documentation',
  to: '/documentation',
  exact: true,
  icon: 'book'
};

export const changelogRoutes = {
  name: 'ChangeLog',
  to: '/changelog',
  exact: true,
  icon: 'code-branch',
  badge: {
    text: `v${version}`,
    color: 'soft-primary'
  }
};

export const componentRoutes = {
  name: 'Components',
  to: '/components',
  icon: 'puzzle-piece',
  children: [
    { to: '/components/alerts', name: 'Alerts' },
    { to: '/components/accordions', name: 'Accordions' },
    {
      to: '/components/autocomplete',
      name: 'Autocomplete'
    },
    { to: '/components/avatar', name: 'Avatar' },
    { to: '/components/badges', name: 'Badges' },
    { to: '/components/backgrounds', name: 'Backgrounds' },
    { to: '/components/breadcrumb', name: 'Breadcrumb' },
    { to: '/components/buttons', name: 'Buttons' },
    { to: '/components/cards', name: 'Cards' },
    {
      to: '/components/cookie-notice',
      name: 'Cookie notice'
    },
    { to: '/components/collapses', name: 'Collapses' },
    {
      to: '/components/carousel',
      name: 'Carousel'
    },
    { to: '/components/dropdowns', name: 'Dropdowns' },
    { to: '/components/forms', name: 'Forms' },
    { to: '/components/listgroups', name: 'List groups' },
    { to: '/components/modals', name: 'Modals' },
    { to: '/components/navs', name: 'Navs' },
    {
      to: '/components',
      name: 'Navbar',
      children: [
        { to: '/components/navbars', name: 'Default' },
        {
          to: '/components/navbar-vertical',
          name: 'Vertical'
        },
        {
          to: '/components/navbar-top',
          name: 'Top'
        },
        {
          to: '/components/combo',
          name: 'Combo'
        }
      ]
    },
    { to: '/components/pageheaders', name: 'Page headers' },
    { to: '/components/paginations', name: 'Paginations' },
    { to: '/components/popovers', name: 'Popovers' },
    { to: '/components/progress', name: 'Progress' },
    { to: '/components/sidepanel', name: 'Sidepanel' },
    { to: '/components/spinners', name: 'Spinners' },
    {
      to: '/components/tab',
      name: 'Tabs',
      badge: {
        text: `New`,
        color: 'soft-success'
      }
    },
    { to: '/components/tables', name: 'Tables' },
    { to: '/components/tooltips', name: 'Tooltips' }
  ]
};

export const pluginRoutes = {
  name: 'Plugins',
  to: '/plugins',
  icon: 'plug',
  children: [
    { to: '/plugins/bulk-select', name: 'Bulk select' },
    {
      to: '/plugins/react-beautiful-dnd',
      name: 'Beautiful DnD'
    },
    {
      to: '/plugins',
      name: 'Chart',
      children: [{ to: '/plugins/chart', name: 'Chart Js' }, { to: '/plugins/echarts', name: 'Echarts' }]
    },
    { to: '/plugins/countup', name: 'Countup' },
    { to: '/plugins/code-highlight', name: 'Code Highlight' },
    { to: '/plugins/datetime', name: 'Datetime' },
    { to: '/plugins/dropzone', name: 'Dropzone' },
    { to: '/plugins/emoji-mart', name: 'Emoji Mart' },
    { to: '/plugins/font-awesome', name: 'Font Awesome' },
    {
      to: '/plugins/calendar-example',
      name: 'Full Calendar'
    },
    { to: '/plugins/image-lightbox', name: 'Image lightbox' },
    { to: '/plugins/lottie', name: 'Lottie' },
    {
      to: '/plugins',
      name: 'Map',
      children: [
        { to: '/plugins/leaflet-map', name: 'Leaflet map' },
        { to: '/plugins/google-map', name: 'Google map' },
        { to: '/plugins/echart-map', name: 'Echart Map' }
      ]
    },
    { to: '/plugins/plyr', name: 'Plyr' },
    { to: '/plugins/progressbar', name: 'Progressbar' },
    { to: '/plugins/react-hook-form', name: 'React Hook Form' },
    {
      to: '/plugins/react-bootstrap-table2',
      name: 'BS Table2'
    },
    { to: '/plugins/select', name: 'Select' },
    { to: '/plugins/slick-carousel', name: 'Slick Carousel' },
    { to: '/plugins/scroll-bar', name: 'Scroll Bar' },
    { to: '/plugins/toastify', name: 'Toastify' },
    { to: '/plugins/typed', name: 'Typed' },
    { to: '/plugins/wysiwyg', name: 'WYSIWYG editor' }
  ]
};

export const utilityRoutes = {
  name: 'Utilities',
  to: '/utilities',
  icon: ['fab', 'hotjar'],
  children: [
    { to: '/utilities/borders', name: 'Borders' },
    { to: '/utilities/clearfix', name: 'Clearfix' },
    { to: '/utilities/closeIcon', name: 'Close icon' },
    { to: '/utilities/colors', name: 'Colors' },
    { to: '/utilities/display', name: 'Display' },
    { to: '/utilities/embed', name: 'Embed' },
    { to: '/utilities/figures', name: 'Figures' },
    { to: '/utilities/flex', name: 'Flex' },
    { to: '/utilities/grid', name: 'Grid' },
    { to: '/utilities/sizing', name: 'Sizing' },
    { to: '/utilities/spacing', name: 'Spacing' },
    { to: '/utilities/stretchedLink', name: 'Stretched link' },
    { to: '/utilities/typography', name: 'Typography' },
    { to: '/utilities/verticalAlign', name: 'Vertical align' },
    { to: '/utilities/visibility', name: 'Visibility' }
  ]
};

// Custom Menu Item
export const adminRoutes = {
  name: 'Quản trị viên',
  to: '/admin',
  icon: 'user',
  children: [
    { to: '/admin/list', name: 'Danh sách QTV' },
    { to: '/admin/authorzation', name: 'Phân quyền' },
    { to: '/admin/create', name: 'Thêm mới' },
  ]
};

export const configRoutes = {
  name: 'Cài đặt hệ thống',
  to: '/config',
  icon: 'copy',
  children: [
    { to: '/config/detail', name: 'Chi tiết' },
  ]
};

export default [
  homeRoutes,
  // gamesRoutes,
  usersRoutes,
  // stickerRoutes,
  backgroundChatRoutes,
  backgroundPostRoutes,
  bannerRoutes,
  // badgeRoutes,
  menuIconRoutes,
  identifierRoutes,
  // chatRoutes,
  censorRoutes,
  // companionRoutes,
  developmentTeamRoutes,
  postsRoutes,
  groupRoutes,
  newpageRoutes,
  emailRoutes,
  RuleRoutes,
  policyRoutes,
  notificationRoutes,
  adminRoutes,
  giftRoutes,
  provineRoutes,
  mediaSystemRoutes,

  chatRoutes,
  kanbanRoutes,
  calenderRoutes,
  authenticationRoutes,
  widgetsRoutes,
  componentRoutes,
  // utilityRoutes,
  // ECommerceRoutes,
  // configRoutes,
  // emailRoutes2,
  // pluginRoutes,
  // documentationRoutes,
  // changelogRoutes,
];
