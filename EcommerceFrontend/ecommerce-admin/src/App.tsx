import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Product from "./components/Product";
import GetAllUser from "./Pages/GetAllUser";
// import Product from "./Pages/Product";

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <><Navbar /><Home /></>
        },
        {
            path: '/about',
            element: <><Navbar /><About /></>
        },
        {
            path: '/product',
            element: <><Navbar /><Product /></>
        },
        {
            path: '/getAllUser',
            element: <><Navbar /><GetAllUser /></>
        },
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;