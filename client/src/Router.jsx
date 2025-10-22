import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/authentication/Login.jsx"
import Signup from "./pages/authentication/Signup.jsx"
import Home from "./pages/home/Home.jsx"
import { Dashboard } from "./pages/dashboard/Dashboard.jsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },

            {
                path: "/signup",
                element: <Signup/>
            },

            {
                path: "/dashboard",
                element: <Dashboard/>
            }
        ]
    }
]);

export {Router};