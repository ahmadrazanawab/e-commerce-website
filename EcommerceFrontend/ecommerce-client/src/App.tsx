import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Cart from "./components/Cart";
import Checkout from "./Pages/Checkout";
import ViewItemDetails from "./components/ViewItemDetails";
import Order from "./Pages/Order";
import Hero from "./Pages/Hero";
import Product from "./Pages/Product";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
// import Product from "./Pages/Product";

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element:<><Navbar/><Home/></>
        },
        {
            path: '/',
            element:<><Navbar/><Hero/></>
        },
        {
            path: '/product',
            element:<><Navbar/><Product/></>
        },
        {
            path: '/about',
            element:<><Navbar/><About/></>
        },
        {
            path: '/cart',
            element:<><Navbar/><Cart/></>
        },
        {
            path: '/itemDetails/:id',
            element:<><Navbar/><ViewItemDetails/></>
        },
        {
            path: '/checkout/:id',
            element:<><Checkout/></>
        },
        {
            path: '/viewOrderitem',
            element:<><Navbar/><Order/></>
        },
        {
            path: '/signin',
            element:<><SignIn/></>
        },
        {
            path: '/signup',
            element:<><SignUp/></>
        },
    ])
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default  App;