import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PublicLesson from "../Pages/PublicLesson/PublicLesson";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddLesson from "../Pages/Dashboard/AddLesson";
import DashboardHome from "../Pages/Dashboard/DashboardHome ";
import MyLesson from "../Pages/Dashboard/MyLesson";
import Upgrade from "../Pages/Payment/Upgrade";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Payment/PaymentCancelled";
import LessonDetails from "../Pages/PublicLesson/LessonDetails";
import Favorites from "../Pages/Dashboard/Favorites";
import Profile from "../Pages/Dashboard/Profile";
import ManageUsers from "../Pages/AdminDashboard/ManageUsers";
import AdminRoutes from "./AdminRoutes";
import ManageLessons from "../Pages/AdminDashboard/ManageLessons";
import AdminProfile from "../Pages/AdminDashboard/AdminProfile";
import DashboardAdmin from "../Pages/AdminDashboard/DashboardAdmin";
import Error404 from "../Component/Error/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index:true,
            Component: Home
        },
        {
            path:'public-lesson',
            element: <PublicLesson></PublicLesson>
        },
        {
            path:'lessons/:id',
            element: <PrivateRoute><LessonDetails></LessonDetails></PrivateRoute>
        },
        
        {
            path: 'upgrade',
            element: <PrivateRoute> <Upgrade></Upgrade></PrivateRoute>
        },
        {
            path: 'payment-success',
            element: <PrivateRoute> <PaymentSuccess></PaymentSuccess></PrivateRoute>
        },
        {
            path: 'payment-cancelled',
            element: <PrivateRoute> <PaymentCancelled></PaymentCancelled></PrivateRoute>
        }, 
        {
            path: '*', 
            Component: Error404
        }
    ]
  }, 

  {
    path:'/',
    Component:AuthLayout,
    children: [
        {
            path:'login',
            Component: Login
        },
        {
            path:'register',
            Component: Register
        },
        
    ]
  },
  {
    path:'/dashboard',
    element: <PrivateRoute> <DashboardLayout> </DashboardLayout></PrivateRoute>,
    children: [
        {
            path:'home',
            Component: DashboardHome
        },

        {
            path:'add-lesson',
            Component: AddLesson
        },
        {
            path: 'my-lesson',
            Component: MyLesson
        }, 
        {
            path: 'my-favorites',
            Component: Favorites
        }, 
        {
            path: 'profile',
            Component: Profile
        },

        {
            path: 'manage-users',
            element: <AdminRoutes> <ManageUsers></ManageUsers></AdminRoutes>
        },
        {
            path: 'manage-lessons',
            element: <AdminRoutes> <ManageLessons></ManageLessons></AdminRoutes>
        },
        {
            path: 'admin-profile',
            element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
        },
        {
            path: 'admin-home',
            element: <AdminRoutes><DashboardAdmin></DashboardAdmin></AdminRoutes>
        },
        {
            path: '*',
            Component: Error404
        }
    ]
  }
]);