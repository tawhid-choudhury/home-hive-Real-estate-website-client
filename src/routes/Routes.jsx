import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Allproperties from "../pages/AllProperties/Allproperties";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import CustomerReviews from "../pages/Dashboard/customer/CustomerReviews";
import DashboardNav from "../pages/Dashboard/DashBoardNav";
import CustomerWishlist from "../pages/Dashboard/customer/CustomerWishlist";
import MakeOffer from "../pages/Dashboard/customer/MakeOffer";
import CustomerBoughtlist from "../pages/Dashboard/customer/CustomerBoughtlist";
import Profile from "../pages/Dashboard/customer/Profile";
import PaymentPage from "../pages/Dashboard/customer/PaymentPage";
import AgentAddProperty from "../pages/Dashboard/agent/AgentAddProperty";
import AgentAddedProperties from "../pages/Dashboard/agent/AgentAddedProperties";
import AgentSoldProperties from "../pages/Dashboard/agent/AgentSoldProperties";
import AgentRequestedProperties from "../pages/Dashboard/agent/AgentRequestedProperties";
import AgentUpdateProperty from "../pages/Dashboard/agent/AgentUpdateProperty";
import AdminManageProperties from "../pages/Dashboard/admin/AdminManageProperties";
import AdminManageUsers from "../pages/Dashboard/admin/AdminManageUsers";
import AdminManageReviews from "../pages/Dashboard/admin/AdminManageReviews";
import AdvertiseProperty from "../pages/Dashboard/admin/AdvertiseProperty";
import ErrorPage from "../components/shared/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/all',
                element: <PrivateRoute><Allproperties /></PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/propertydetails/:id',
                element: <PrivateRoute><PropertyDetails /></PrivateRoute>,
                // loader: ({ params }) => getPropertyDetails(params.id),
            },
        ]
    }, {
        path: '/dashboard',
        element: <PrivateRoute><DashboardNav /></PrivateRoute>,
        children: [
            {
                path: "profile",
                element: <Profile />
            },

            // customer links
            {
                path: "/dashboard/wishlist",
                element: <CustomerWishlist />
            },
            {
                path: "/dashboard/makeOffer/:id",
                element: <MakeOffer />
            },
            {
                path: "/dashboard/bought",
                element: <CustomerBoughtlist />
            },
            {
                path: "/dashboard/reviews",
                element: <CustomerReviews />
            },
            {
                path: "/dashboard/payment/:id",
                element: <PaymentPage />
            },

            // agentlinks
            {
                path: "/dashboard/addproperty",
                element: <AgentAddProperty />
            },
            {
                path: "/dashboard/myproperties",
                element: <AgentAddedProperties />
            },
            {
                path: "/dashboard/soldproperties",
                element: <AgentSoldProperties />
            },
            {
                path: "/dashboard/requests",
                element: <AgentRequestedProperties />
            },
            {
                path: "/dashboard/update/:id",
                element: <AgentUpdateProperty />
            },

            // admin links
            {
                path: "/dashboard/manageproperties",
                element: <AdminManageProperties />
            },
            {
                path: "/dashboard/manageusers",
                element: <AdminManageUsers />
            },
            {
                path: "/dashboard/managereviews",
                element: <AdminManageReviews />
            },
            {
                path: "/dashboard/advertise",
                element: <AdvertiseProperty />
            },

        ]
    },
])

export default router;