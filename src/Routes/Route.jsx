import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import UpdateProfilePage from "../Pages/UpdateProfilePage/UpdateProfilePage";
import ProfileDetailsPage from "../Pages/ProfileDetailsPage/ProfileDetailsPage";
import UserDetails from "../Pages/UserDetails/UserDetails";
import AuthProviders from "../Pages/Components/Providers/AuthProviders";
import PrivateRoute from "../Pages/Components/PrivateRoute/PrivateROute";

export const router = createBrowserRouter([
    
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            path:'/',
            element:<Home></Home>

        },
        {
            path:'/LogIn',
            element:<LogIn></LogIn>
        },
        {
            path:'/Register',
            element:<Register></Register>
        },
        {
            path:'/UpdateProfilePage',
            element:<PrivateRoute><UpdateProfilePage></UpdateProfilePage></PrivateRoute>
        },
        {
            path:'/ProfileDetailsPage',
            element:<PrivateRoute><ProfileDetailsPage></ProfileDetailsPage></PrivateRoute>
        },
        {
            path:'/UserDetails',
            element:<UserDetails></UserDetails>,
        },
       

    ]
  },
]);