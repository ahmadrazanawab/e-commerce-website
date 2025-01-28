import { useState } from "react";
import { BiCartDownload } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../Redux/Store";


interface LinksType {
    id: number;
    name: string;
    to: string;
    style?: string;
}
const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const cart = useSelector((state: RootState) => (state.products.cart));
    const totalCart = cart.length;
    const Links: LinksType[] = [
        { id: 1, name: "Home", to: '/' },
        { id: 2, name: "About", to: '/about' },
        { id: 3, name: "Product", to: '/product' },
        { id: 4, name: "Orders", to: '/viewOrderitem' },
    ];
    let location = useLocation();
    let navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem('token');
        alert("Log out successfully");
        navigate('/signin');
    }

    return (
        <nav className="bg-gray-800 fixed flex justify-between py-5 border-b-4 border-red-400 shadow-md w-full">
            <div className="flex">
                <Link to="/" className="text-white mx-2">
                    <span className="sm:text-xl text-sm text-white">Apna</span>
                    <span className="sm:text-xl text-sm text-gray-200">Shope</span>
                </Link>

                <ul className={`flex md:flex-row  flex-col md:static absolute md:bg-gray-800 bg-slate-700 md:mt-0 mt-14 md:py-0 py-4 items-center w-full  text-white text-xl ${open === true ? 'left-0 duration-700' : 'left-[-860px] duration-700 opacity-0'} opacity-100`}>
                    {
                        Links.map(({ id, name, to }) => (
                            <li key={id} className="md:mx-2 md:my-0 my-2">
                                <Link to={to} onClick={() => { setOpen(false) }} className={`${location.pathname === to ? "text-pink-500 underline duration-500" : ""}`}>{name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
           
            <div className="flex mx-2 items-center">
                <div className="sm:block hidden">
                    {!localStorage.getItem('token') ? (<><Link to="/signup"
                        className="bg-blue-700 my-0 mx-1 rounded text-white text-sm px-2 py-1 border-[1px] border-gray-600 outline">
                        SignUp
                    </Link>
                        <Link to="/signin"
                            className="bg-blue-700 rounded my-0  mx-1  text-white text-sm px-2 py-1 border-[1px] border-gray-900 outline">
                            SignIn
                        </Link>
                    </>) :
                        <button onClick={handlelogout}
                            className="bg-blue-700 rounded sm:my-0 my-1 sm:mx-2  text-white text-sm px-2 py-1 border-[1px] border-gray-600 outline">
                            Logout
                        </button>
                    }
                </div>
                <Link to='/cart' className="flex relative">
                    <span className="text-red-600 text-xl font-bold flex">({totalCart})</span>
                    <BiCartDownload className="text-white cursor-pointer " size={30} />
                </Link>
                <div onClick={() => { setOpen(!open) }} className={`text-white md:hidden visible  flex items-center mr-4 ml-2 justify-center`}>
                    {!open ? <GiHamburgerMenu className="" size={25} />
                        : <IoClose className="font-bold" size={25} />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;