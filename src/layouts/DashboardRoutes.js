import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Alerts from '../components/bootstrap-components/Alerts';
import Avatar from '../components/bootstrap-components/Avatar';
import AutocompleteExample from '../components/bootstrap-components/AutocompleteExample';
import Backgrounds from '../components/bootstrap-components/Backgrounds';
import Badges from '../components/bootstrap-components/Badges';
import Breadcrumbs from '../components/bootstrap-components/Breadcrumb';
import Buttons from '../components/bootstrap-components/Buttons';
import Cards from '../components/bootstrap-components/Cards';
import Carousel from '../components/bootstrap-components/Carousel';
import Collapses from '../components/bootstrap-components/Collapses';
import Combo from '../components/bootstrap-components/Combo';
import CookieNotice from '../components/bootstrap-components/CookieNotice';
import Dropdowns from '../components/bootstrap-components/Dropdowns';
import FalconAccordions from '../components/bootstrap-components/FalconAccordions';
import Forms from '../components/bootstrap-components/Forms';
import ListGroups from '../components/bootstrap-components/ListGroups';
import Modals from '../components/bootstrap-components/Modals';
import Navbars from '../components/bootstrap-components/Navbars';
import NavBarTop from '../components/bootstrap-components/NavBarTop';
import Navs from '../components/bootstrap-components/Navs';
import PageHeaders from '../components/bootstrap-components/PageHeaders';
import Paginations from '../components/bootstrap-components/Paginations';
import Popovers from '../components/bootstrap-components/Popovers';
import ProgressBar from '../components/bootstrap-components/ProgressBar';
import Sidepanel from '../components/bootstrap-components/Sidepanel';
import Spinners from '../components/bootstrap-components/Spinners';
import Tables from '../components/bootstrap-components/Tables';
import Tabs from '../components/bootstrap-components/Tabs';
import Tooltips from '../components/bootstrap-components/Tooltips';
import VerticalNavbar from '../components/bootstrap-components/VerticalNavbar';
import Calendar from '../components/calendar/Calendar';
import ChangeLog from '../components/changelog/ChangeLog';
import Chat from '../components/chat/Chat';
import GettingStarted from '../components/documentation/GettingStarted';
import Checkout from '../components/e-commerce/Checkout';
import Customers from '../components/e-commerce/Customers';
import FavouriteItems from '../components/e-commerce/FavouriteItems';
import OrderDetails from '../components/e-commerce/OrderDetails';
import Orders from '../components/e-commerce/Orders';
import ProductDetails from '../components/e-commerce/ProductDetails';
import Products from '../components/e-commerce/Products';
import ShoppingCart from '../components/e-commerce/ShoppingCart';
import Compose from '../components/email/Compose';
import EmailDetail from '../components/email/EmailDetail';
import Inbox from '../components/email/Inbox';
import InboxProvider from '../components/email/inbox/InboxProvider';
import Starter from '../components/extra/Starter';
import Feed from '../components/feed/Feed';
import Kanban from '../components/kanban/Kanban';
import Activity from '../components/page/Activity';
import UserCensor from '../components/page/UserCensor';
import Associations from '../components/page/Associations';
import Billing from '../components/page/Billing';
import CustomerDetails from '../components/page/CustomerDetails';
import EventCreate from '../components/page/EventCreate';
import EventDetail from '../components/page/EventDetail';
import Events from '../components/page/Events';
import Faq from '../components/page/Faq';
import Games from '../components/games/index';
import GameCreate from '../components/games/GameCreate';
import GameUpdate from '../components/games/GameUpdate';
import GameDetail from '../components/games/GameDetail';
import InvitePeople from '../components/page/InvitePeople';
import Invoice from '../components/page/Invoice';
import Notifications from '../components/page/Notifications';
import People from '../components/page/People';
import Settings from '../components/page/Settings';
import BulkSelect from '../components/plugins/BulkSelect';
import CalendarExample from '../components/plugins/CalendarExample';
import Chart from '../components/plugins/Chart';
import CodeHighlightDoc from '../components/plugins/CodeHighlightDoc';
import CountUpExample from '../components/plugins/Countup';
import DatetimeExample from '../components/plugins/Datetime';
import Dropzone from '../components/plugins/Dropzone';
import EchartMap from '../components/plugins/EchartMap';
import Echarts from '../components/plugins/Echarts';
import EmojiMart from '../components/plugins/EmojiMart';
import FontAwesome from '../components/plugins/FontAwesome';
import GoogleMapExample from '../components/plugins/GoogleMap';
import ImageLightbox from '../components/plugins/ImageLightbox';
import Leaflet from '../components/plugins/Leaflet';
import Lottie from '../components/plugins/Lottie';
import Plyr from '../components/plugins/Plyr';
import ProgressBarJs from '../components/plugins/ProgressBarJs';
import QuillEditorExample from '../components/plugins/Quill';
import ReactBeautifulDnD from '../components/plugins/ReactBeautifulDnD';
import ReactBootstrapTable2 from '../components/plugins/ReactBootstrapTable2';
import ReactHookFrom from '../components/plugins/ReactHookFrom';
import Scrollbar from '../components/plugins/Scrollbar';
import Select from '../components/plugins/Select';
import SlickCarousel from '../components/plugins/SlickCarousel';
import Toastify from '../components/plugins/Toastify';
import Typed from '../components/plugins/Typed';
import Pricing from '../components/pricing/Pricing';
import PricingAlt from '../components/pricing/PricingAlt';
import Profile from '../components/profile/Profile';
import Borders from '../components/utilities/Borders';
import Clearfix from '../components/utilities/Clearfix';
import CloseIcon from '../components/utilities/CloseIcon';
import Colors from '../components/utilities/Colors';
import Display from '../components/utilities/Display';
import Embed from '../components/utilities/Embed';
import Figures from '../components/utilities/Figures';
import Flex from '../components/utilities/Flex';
import Grid from '../components/utilities/Grid';
import Sizing from '../components/utilities/Sizing';
import Spacing from '../components/utilities/Spacing';
import StretchedLink from '../components/utilities/StretchedLink';
import Typography from '../components/utilities/Typography';
import VerticalAlign from '../components/utilities/VerticalAlign';
import Visibility from '../components/utilities/Visibility';
import Widgets from '../components/widgets/Widgets';
import Dashboard from '../components/dashboard/Dashboard';
import DashboardAlt from '../components/dashboard-alt/DashboardAlt';
import Users from '../components/users';
import GiftCreate from '../components/gift/GiftCreate';
import Companion from '../components/companion/Companion';
import Groups from '../components/groups';
import Posts from '../components/post';
import PostCategory from '../components/postCategory';
import PostReport from '../components/postReport';
import UserUpdate from '../components/users/UserUpdate';
import Stickers from '../components/sticker';
import StickerAdd from '../components/sticker/StickerAdd';
import Policy from '../components/policy';
import PolicyCreate from '../components/policy/create';
import PolicyUpdate from '../components/policy/update';
import Identifier from '../components/identifier';
import Notification from '../components/notification/Notification';
import NotificationCreate from '../components/notification/NotificationCreate';
import Province from '../components/province/Province';
import BackgroundPosts from '../components/backgroundPost';
import BackgroundPostEdit from '../components/backgroundPost/BackgroundPostEdit';
import ReactionActivitys from '../components/reactionActivity';
import ReactionActivityEdit from '../components/reactionActivity/ReactionActivityEdit';
import MediaSystems from '../components/mediaSystem';
import MediaSystemEdit from '../components/mediaSystem/MediaSystemEdit';
import BadgeList from '../components/badge';
import BadgeEdit from '../components/badge/BadgeEdit';
import UserCensorListNoti from '../components/page/UserCensorListNoti';
import UserCensorListGift from '../components/page/UserCensorListGift';
import MenuIconList from '../components/menu-icon';
import MenuIconCreate from '../components/menu-icon/MenuIconCreate';
import Gift from '../components/gift/Gift';
import RuleAdd from '../components/rule/RuleAdd';
import Rules from '../components/rule';
import BackgroundChat from '../components/backgroundChat';
import BackgroundChatAdd from '../components/backgroundChat/BackgroundChatAdd';
import PostsChart from '../components/post/PostsChart';
import Banner from '../components/Banner';
import BannerAdd from '../components/Banner/BannerAdd';
import Pages from '../components/pages';

const InboxRoutes = ({ match: { url } }) => (
  <InboxProvider>
    <Switch>
      <Route path={`${url}/email-detail`} exact component={EmailDetail} />
      <Route path={`${url}/inbox`} exact component={Inbox} />
      <Route path={`${url}/compose`} exact component={Compose} />

      {/*Redirect*/}
      <Redirect to="/errors/404" />
    </Switch>
  </InboxProvider>
);

const ProductRoutes = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}/products/:productLayout`} exact component={Products} />
    <Route path={`${url}/checkout`} exact component={Checkout} />
    <Route path={`${url}/product-details/:id`} exact component={ProductDetails} />
    <Route path={`${url}/product-details/`} exact component={ProductDetails} />
    <Route path={`${url}/shopping-cart`} exact component={ShoppingCart} />
    <Route path={`${url}/orders`} exact component={Orders} />
    <Route path={`${url}/order-details`} exact component={OrderDetails} />
    <Route path={`${url}/customers`} exact component={Customers} />
    <Route path={`${url}/favourite-items`} exact component={FavouriteItems} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

const DashboardRoutes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/dashboard-alt" exact component={DashboardAlt} />
    <Route path="/feed" exact component={Feed} />

    {/* Games */}
    <Route path="/games" exact component={Games} />
    <Route path="/games/create" exact component={GameCreate} />
    <Route path="/games/update/:id" exact component={GameUpdate} />
    <Route path="/games/detail/:id" exact component={GameDetail} />

    {/* MenuIcon */}
    <Route path="/menu-icon" exact component={MenuIconList} />
    <Route path="/menu-icon/create" exact component={MenuIconCreate} />
    <Route path="/menu-icon/update/:id" exact component={MenuIconCreate} />



    {/* Users */}
    <Route path="/users" exact component={Users} />
    <Route path="/users/update/:id" exact component={UserUpdate} />

    {/* Gift */}
    <Route path="/gift" exact component={Gift} />
    <Route path="/gift/create/:id" exact component={GiftCreate} />
    <Route path="/gift/create" exact component={GiftCreate} />


    {/* StIcker */}
    <Route path="/sticker" exact component={Stickers} />
    <Route path="/sticker/add/:id" exact component={StickerAdd} />
    <Route path="/sticker/add" exact component={StickerAdd} />

    {/* BackgroundChat */}
    <Route path="/backgroundPost" exact component={BackgroundPosts} />
    <Route path="/backgroundPost/update/:id" exact component={BackgroundPostEdit} />
    <Route path="/backgroundPost/add" exact component={BackgroundPostEdit} />

    {/* BackgroundPost */}
    <Route path="/backgroundChat" exact component={BackgroundChat} />
    <Route path="/backgroundChat/update/:id" exact component={BackgroundChatAdd} />
    <Route path="/backgroundChat/add" exact component={BackgroundChatAdd} />

    {/* Banner */}
    <Route path="/banner" exact component={Banner} />
    <Route path="/banner/update/:id" exact component={BannerAdd} />
    <Route path="/banner/add" exact component={BannerAdd} />

    {/* Badge */}
    <Route path="/badge" exact component={BadgeList} />
    <Route path="/badge/create" exact component={BadgeEdit} />
    <Route path="/badge/update/:id" exact component={BadgeEdit} />

    {/* Background post */}
    <Route path="/background-post" exact component={BackgroundPosts} />
    <Route path="/background-post/create" exact component={BackgroundPostEdit} />
    <Route path="/background-post/update/:id" exact component={BackgroundPostEdit} />

    {/* Reaction activity */}
    <Route path="/reaction-activity" exact component={ReactionActivitys} />
    <Route path="/reaction-activity/create" exact component={ReactionActivityEdit} />
    <Route path="/reaction-activity/update/:id" exact component={ReactionActivityEdit} />

    {/* Setting */}
    <Route path="/media-system" exact component={MediaSystems} />
    <Route path="/media-system/create" exact component={MediaSystemEdit} />
    <Route path="/media-system/update/:id" exact component={MediaSystemEdit} />

    {/* Nhà đồng hành  */}
    <Route path="/companion" exact component={Companion} />
    {/* tỉnh */}
    <Route path="/province" exact component={Province} />

    {/* Group */}
    <Route path="/groups" exact component={Groups} />
    {/* Posts */}
    <Route path="/posts" exact component={Posts} />
    <Route path="/posts/chart" exact component={PostsChart} />
    <Route path="/posts/category" exact component={PostCategory} />
    <Route path="/posts/report" exact component={PostReport} />

    {/* policy */}
    <Route path="/policy" exact component={Policy} />
    <Route path="/policy/create" exact component={PolicyCreate} />
    <Route path="/policy/update/:id" exact component={PolicyUpdate} />

    <Route path="/rule" exact component={Rules} />
    <Route path="/rule/add" exact component={RuleAdd} />
    <Route path="/rule/add/:id" exact component={RuleAdd} />



    {/* identity */}
    <Route path="/identifier" exact component={Identifier} />

    {/* Notification */}
    <Route path="/notification" exact component={Notification} />
    <Route path="/notification/create" exact component={NotificationCreate} />





    {/*Pages*/}
    <Route path="/censor" exact component={UserCensor} />
    <Route path="/censor/list-notification" exact component={UserCensorListNoti} />
    <Route path="/censor/list-gift" exact component={UserCensorListGift} />


    <Route path="/pages/activity" exact component={Activity} />
    <Route path="/pages/associations" exact component={Associations} />
    <Route path="/pages/billing" exact component={Billing} />
    <Route path="/pages/customer-details" exact component={CustomerDetails} />
    <Route path="/pages/event-detail" exact component={EventDetail} />
    <Route path="/pages/event-create" exact component={EventCreate} />
    <Route path="/pages/events" exact component={Events} />
    <Route path="/pages/faq" exact component={Faq} />
    <Route path="/pages/invoice" exact component={Invoice} />
    <Route path="/pages/invite-people" exact component={InvitePeople} />
    <Route path="/pages/notifications" exact component={Notifications} />
    <Route path="/pages/people" exact component={People} />
    <Route path="/pages/pricing" exact component={Pricing} />
    <Route path="/pages/pricing-alt" exact component={PricingAlt} />
    <Route path="/pages/profile" exact component={Profile} />
    <Route path="/pages/settings" exact component={Settings} />
    <Route path="/pages/starter" exact component={Starter} />

    {/* New Page */}
    <Route path="/manage-pages" exact component={Pages} />


    {/*chat*/}
    <Route path="/chat" exact component={Chat} />
    {/*calendar*/}
    <Route path="/calendar" exact component={Calendar} />
    {/*kanban*/}
    <Route path="/kanban" exact component={Kanban} />
    {/*E commerce*/}
    <Route path="/e-commerce" component={ProductRoutes} />

    {/*Email*/}
    <Route path="/email" component={InboxRoutes} />

    {/*widgets*/}
    <Route path="/widgets" component={Widgets} />

    {/*Documentation*/}
    <Route path="/documentation" exact component={GettingStarted} />

    {/*Changelog*/}
    <Route path="/changelog" exact component={ChangeLog} />

    {/*Components*/}
    <Route path="/components/alerts" exact component={Alerts} />
    <Route path="/components/autocomplete" exact component={AutocompleteExample} />
    <Route path="/components/accordions" exact component={FalconAccordions} />
    <Route path="/components/avatar" exact component={Avatar} />
    <Route path="/components/badges" exact component={Badges} />
    <Route path="/components/backgrounds" exact component={Backgrounds} />
    <Route path="/components/breadcrumb" exact component={Breadcrumbs} />
    <Route path="/components/buttons" exact component={Buttons} />
    <Route path="/components/cards" exact component={Cards} />
    <Route path="/components/cookie-notice" exact component={CookieNotice} />
    <Route path="/components/collapses" exact component={Collapses} />
    <Route path="/components/dropdowns" exact component={Dropdowns} />
    <Route path="/components/forms" exact component={Forms} />
    <Route path="/components/listgroups" exact component={ListGroups} />
    <Route path="/components/modals" exact component={Modals} />
    <Route path="/components/navs" exact component={Navs} />
    <Route path="/components/navbars" exact component={Navbars} />
    <Route path="/components/navbar-top" exact component={NavBarTop} />
    <Route path="/components/combo" exact component={Combo} />
    <Route path="/components/navbar-vertical" exact component={VerticalNavbar} />
    <Route path="/components/Sidepanel" exact component={Sidepanel} />
    <Route path="/components/pageheaders" exact component={PageHeaders} />
    <Route path="/components/paginations" exact component={Paginations} />
    <Route path="/components/popovers" exact component={Popovers} />
    <Route path="/components/progress" exact component={ProgressBar} />
    <Route path="/components/tab" exact component={Tabs} />
    <Route path="/components/tables" exact component={Tables} />
    <Route path="/components/tooltips" exact component={Tooltips} />
    <Route path="/components/spinners" exact component={Spinners} />
    <Route path="/components/carousel" exact component={Carousel} />

    {/*Utilities*/}
    <Route path="/utilities/borders" exact component={Borders} />
    <Route path="/utilities/clearfix" exact component={Clearfix} />
    <Route path="/utilities/closeIcon" exact component={CloseIcon} />
    <Route path="/utilities/colors" exact component={Colors} />
    <Route path="/utilities/display" exact component={Display} />
    <Route path="/utilities/embed" exact component={Embed} />
    <Route path="/utilities/figures" exact component={Figures} />
    <Route path="/utilities/flex" exact component={Flex} />
    <Route path="/utilities/grid" exact component={Grid} />
    <Route path="/utilities/sizing" exact component={Sizing} />
    <Route path="/utilities/spacing" exact component={Spacing} />
    <Route path="/utilities/stretchedLink" exact component={StretchedLink} />
    <Route path="/utilities/typography" exact component={Typography} />
    <Route path="/utilities/verticalAlign" exact component={VerticalAlign} />
    <Route path="/utilities/visibility" exact component={Visibility} />

    {/*Plugins*/}
    <Route path="/plugins/calendar-example" exact component={CalendarExample} />
    <Route path="/plugins/bulk-select" exact component={BulkSelect} />
    <Route path="/plugins/typed" exact component={Typed} />
    <Route path="/plugins/image-lightbox" exact component={ImageLightbox} />
    <Route path="/plugins/lottie" exact component={Lottie} />
    <Route path="/plugins/google-map" exact component={GoogleMapExample} />
    <Route path="/plugins/wysiwyg" exact component={QuillEditorExample} />
    <Route path="/plugins/chart" exact component={Chart} />
    <Route path="/plugins/countup" exact component={CountUpExample} />
    <Route path="/plugins/datetime" exact component={DatetimeExample} />
    <Route path="/plugins/font-awesome" exact component={FontAwesome} />
    <Route path="/plugins/echarts" exact component={Echarts} />
    <Route path="/plugins/toastify" exact component={Toastify} />
    <Route path="/plugins/select" exact component={Select} />
    <Route path="/plugins/slick-carousel" exact component={SlickCarousel} />
    <Route path="/plugins/scroll-bar" exact component={Scrollbar} />
    <Route path="/plugins/progressbar" exact component={ProgressBarJs} />
    <Route path="/plugins/plyr" exact component={Plyr} />
    <Route path="/plugins/react-hook-form" exact component={ReactHookFrom} />
    <Route path="/plugins/leaflet-map" exact component={Leaflet} />
    <Route path="/plugins/echart-map" exact component={EchartMap} />
    <Route path="/plugins/dropzone" exact component={Dropzone} />
    <Route path="/plugins/code-highlight" exact component={CodeHighlightDoc} />
    <Route path="/plugins/emoji-mart" exact component={EmojiMart} />
    <Route path="/plugins/react-bootstrap-table2" exact component={ReactBootstrapTable2} />
    <Route path="/plugins/react-beautiful-dnd" exact component={ReactBeautifulDnD} />

    {/*Redirect*/}
    <Redirect to="/errors/404" />
  </Switch>
);

export default DashboardRoutes;
