import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Cart from "./components/Cart";
import Checkout from "./Pages/Checkout";
// import Product from "./Pages/Product";

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element:<><Navbar/><Home/></>
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
            path: '/checkout/:id',
            element:<><Checkout/></>
        },
    ])
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default  App;