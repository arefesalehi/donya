import Home from "./pages/home/Home";
import Course from "./pages/course/Course";
import Category from './pages/category/Category'
import Article from './pages/article/Article'
import AllCourse from './components/allCourse/AllCourse'
import Contact from "./pages/contact/Contact";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import AllArticle from './components/AllArticle/AllArticle'




import AdminHome from "./pages/adminPage/AdminHome/AdminHome";
import Menus from './pages/adminPage/Menus/Menus'
import Courses from './pages/adminPage/Courses/Courses'
import Sessions from "./pages/adminPage/Sessions/Sessions";
import Users from "./pages/adminPage/Users/Users";
import Comments from "./pages/adminPage/Comments/Comments";
import Tickets from "./pages/adminPage/Tickets/Tickets";
import Offs from "./pages/adminPage/Offs/Offs";
import Discount from "./pages/adminPage/Discount/Discount";
import Categorys from "./pages/adminPage/Category/Categorys";
import Messages from "./pages/adminPage/Messages/Messages";
import MainPage from "./pages/adminPage/mainPage/MainPage";



import UserPage from "./pages/UserPage/UserPage";
import UserHome from "./pages/UserPage/UserHome/UserHome";
import UserOrders from "./pages/UserPage/UserOrders/UserOrders";
import OrderDetail from "./pages/UserPage/orderDetail/OrderDetail";
import UserCourse from "./pages/UserPage/UserCourse/UserCourse";
import UserTicket from "./pages/UserPage/UserTicket/UserTicket";
import Ticket from "./pages/UserPage/Ticket/Ticket";
import MyTicket from "./pages/UserPage/MyTicket/MyTicket";
import UserPanelEdit from "./pages/UserPage/UserPanelEdit/UserPanelEdit";
import UserBag from "./pages/UserPage/userBag/UserBag";
import Articles from "./pages/adminPage/Articles/Articles";
import Draft from "./pages/adminPage/Draft/Draft";
import Search from "./pages/search/Search";


let donyaRoutes =[
    {path:'/' , element:<Home/> },
    {path:'/course-info/:courseName/*' , element:<Course/> , children:[
        {path:'information' , element:<Course/>},
        {path:'moreDetail' , element:<Course/>},
        {path:'support' , element:<Course/>},
        {path:'Comments' , element:<Course/>},
    ] },

    {path:'/category-info/:categoryName/:page' , element:<Category/> },
    {path:'/article-info/:articleName' , element:<Article/> },
    {path:'/courses/:page' , element:<AllCourse/> },
    {path:'/articles/:page' , element:<AllArticle/> },
    {path:'/contact' , element:<Contact/> },
    {path:'/register' , element:<Register/> },
    {path:'/login' , element:<Login/> },
    {path:'/search/:value' , element:<Search/>},




    {path:'/p-admin' , element:<AdminHome/> , children:[
        {path:'' , element:<MainPage/>},
        {path:'menus' , element:<Menus/>},
        {path:'courses' , element:<Courses/> },
        {path:'sessions' , element:<Sessions/>},
        {path:'articles' , element:<Articles/>},
        {path:'articles/draft/:shortName' , element:<Draft/>},
        {path:'users' , element:<Users/>},
        {path:'comments' , element:<Comments/>},
        {path:'tickets' , element:<Tickets/>},
        {path:'offs' , element:<Offs/>},
        {path:'discount' , element:<Discount/>},
        {path:'category' , element:<Categorys/>},
        {path:'messages' , element:<Messages/>},
    ] },


    {path:'/my-account', element:<UserPage/> , children:[
        {path:""  , element:<UserHome/> },
        {path:"orders"  , element:<UserOrders/> },
        {path:"orders/:orderDetail"  , element:<OrderDetail/> },
        {path:'money' , element:<UserBag/>},
        {path:"buyed"  , element:<UserCourse/> },
        {path:"tickets", element:<UserTicket/> },
        {path:"send-ticket", element:<Ticket/>  },
        {path:"tickets/answer/:id", element:<MyTicket/>  },
        {path:"edit-account", element:<UserPanelEdit/>  },
    ]}




]

export default donyaRoutes;