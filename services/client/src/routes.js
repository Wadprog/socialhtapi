import routesPath from "./routesPath";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ResetPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPasswordSuccess from "./pages/ResetPassword/ForgotPasswordSuccess";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import Blog from "./pages/Blog/Blog";
import ViewBlog from "./pages/Blog/ViewBlog";
import AddBlog from "./pages/Blog/AddBlog";
import ViewPost from "./pages/NewsFeed/ViewPost";
import Profil from "./pages/Profil/Profil";
import EditProfile from "./pages/Profil/EditProfile";
import Message from "./pages/Message/Message";
import Member from "./pages/Member/Member";
import AddCommunity from "./pages/Community/AddCommunity";
import ViewCommunity from "./pages/Community/ViewCommunity";
import Community from "./pages/Community/Community";
import Forum from "./pages/Forum/Forum";
import ViewForum from "./pages/Forum/ViewForum";
import ForumList from "./pages/Forum/ForumList";
import PreviewPhoto from "./pages/NewsFeed/PreviewPhoto";
import Notification from "./pages/Notification/Notification";
import NotificationSetting from "./pages/Notification/NotificationSetting";
import CallScreen from "./pages/Call/CallScreen";
import TermsConditions from "./pages/Policies/TermsConditions";
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import CommunityGuidelines from "./pages/Policies/CommunityGuidelines";
import TestSingleComponents from "./pages/TestSingleComponents/index";
import { Step, StepTwo, StepThree, StepFour } from "./pages/Profil/Steps";
import Lockscreen from "./pages/Lockscreen/Lockscreen";

//define access roles
let role = {
  PUBLIC: "public",
  USER: "user",
  AUTH: "auth",
  CALL: "call",
  GENERAL: "general",
};

//Define all routes on the app
let routes = [
  {
    path: routesPath.LOGIN,
    name: "Login",
    element: Login,
    access: role.PUBLIC,
  },
  {
    path: routesPath.LOCKSCREEN,
    name: "Lockscreen",
    element: Lockscreen,
    access: role.PUBLIC,
  },
  {
    path: routesPath.REGISTER,
    name: "Register",
    element: Register,
    access: role.PUBLIC,
  },
  {
    path: routesPath.RESET_PASSWORD,
    name: "Reset Password",
    element: ResetPassword,
    access: role.PUBLIC,
  },
  {
    path: routesPath.FORGOT_PASSWORD_SUCCESS,
    name: "Forgot Password Success",
    element: ForgotPasswordSuccess,
    access: role.PUBLIC,
  },
  {
    path: routesPath.FORGOT_PASSWORD,
    name: "Forgot Password",
    element: ForgotPassword,
    access: role.PUBLIC,
  },
  {
    path: routesPath.VERIFY_EMAIL,
    name: "Verified Email",
    element: VerifyEmail,
    access: role.USER,
  },
  {
    path: routesPath.NEWSFEED,
    name: "News Feed",
    element: NewsFeed,
    access: role.USER,
  },
  {
    path: routesPath.BLOG,
    name: "Blog",
    element: Blog,
    access: role.USER,
  },
  {
    path: routesPath.VIEW_BLOG,
    name: "View blog",
    element: ViewBlog,
    access: role.USER,
  },
  {
    path: routesPath.ADD_BLOG,
    name: "Add Blog",
    element: AddBlog,
    access: role.USER,
  },
  {
    path: routesPath.PROFILE,
    name: "Profile",
    element: Profil,
    access: role.USER,
  },

  {
    path: routesPath.PROFILE_EDIT,
    name: "Edit Profile",
    element: EditProfile,
    access: role.USER,
  },

  {
    path: routesPath.MESSAGE,
    name: "Message",
    element: Message,
    access: role.USER,
  },
  {
    path: routesPath.VOICE_CALL,
    name: "Call",
    element: CallScreen,
    access: role.CALL,
  },
  {
    path: routesPath.VIEW_MESSAGE,
    name: "View Message",
    element: Message,
    access: role.USER,
  },
  {
    path: routesPath.POST,
    name: "Post",
    element: ViewPost,
    access: role.USER,
  },
  {
    path: routesPath.POST_PREVIEW,
    name: "Post preview photo",
    element: PreviewPhoto,
    access: role.CALL,
  },
  {
    path: routesPath.MEMBERS,
    name: "Member",
    element: Member,
    access: role.USER,
  },
  {
    path: routesPath.GROUPS,
    name: "Community",
    element: Community,
    access: role.USER,
  },
  {
    path: routesPath.ADD_GROUPS,
    name: "Add Community",
    element: AddCommunity,
    access: role.USER,
  },
  {
    path: routesPath.VIEW_GROUPS,
    name: "View Community",
    element: ViewCommunity,
    access: role.USER,
  },
  {
    path: routesPath.FORUMS,
    name: "Forums",
    element: Forum,
    access: role.USER,
  },
  {
    path: routesPath.VIEW_FORUMS,
    name: "View Forums",
    element: ViewForum,
    access: role.USER,
  },
  {
    path: routesPath.VIEW_LIST_FORUMS,
    name: "View List Forums",
    element: ForumList,
    access: role.USER,
  },
  {
    path: routesPath.NOTIFICATIONS,
    name: "Notifications",
    element: Notification,
    access: role.USER,
  },
  {
    path: routesPath.NOTIFICATIONS_SETTINGS,
    name: "Notifications Settings",
    element: NotificationSetting,
    access: role.USER,
  },
  {
    path: routesPath.STEP_ONE,
    name: "Step one",
    element: Step,
    access: role.PUBLIC,
  },
  {
    path: routesPath.STEP_TWO,
    name: "Step two",
    element: StepTwo,
    access: role.AUTH,
  },
  {
    path: routesPath.STEP_THREE,
    name: "Step three",
    element: StepThree,
    access: role.AUTH,
  },
  {
    path: routesPath.STEP_FOUR,
    name: "Step four",
    element: StepFour,
    access: role.AUTH,
  },
  {
    path: routesPath.TEST_PAGE,
    name: "Test page",
    element: TestSingleComponents,
    access: role.CALL,
  },
  { path: routesPath.TERMS_CONDITIONS, name: "Terms Conditions", element: TermsConditions, access: role.GENERAL },
  { path: routesPath.PRIVACY_POLICY, name: "Privacy Policy", element: PrivacyPolicy, access: role.GENERAL },
  { path: routesPath.COMMUNITY_GUIDELINES, name: "Community Guidelines", element: CommunityGuidelines, access: role.GENERAL },
];
export { routes, role };
