import { useState } from "react";
import { BiCartDownload } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

interface LinksType{
    id: number;
    name: string;
    to: string;
    style?: string;
}
const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false);

    const Links:LinksType[] = [
        { id: 1, name: "Home", to: '/' },
        { id: 2, name: "About", to: '/about' },
        { id: 3, name: "Product", to: '/product' },
    ];
    let location = useLocation();
    return (
        <nav className="bg-gray-800 fixed flex justify-between py-5 border-b-4 border-red-400 shadow-md w-full">
            <div className="flex">
                <h4 className="text-white mx-2">
                    <span className="sm:text-xl text-sm text-white">Apna</span>
                    <span className="sm:text-xl text-sm text-gray-200">Shope</span>
                </h4>

                <ul className={`flex md:flex-row  flex-col md:static absolute md:bg-gray-800 bg-slate-700 md:mt-0 mt-14 md:py-0 py-4 items-center w-full  text-white text-xl ${open === true ? 'left-0 duration-700':'left-[-860px] duration-700 opacity-0'} opacity-100`}>
                    {
                        Links.map(({id, name, to }) => (
                            <li key={id} className="md:mx-2 md:my-0 my-2">
                                <Link to={to} onClick={()=>{setOpen(false)}} className={` ${location.pathname === to ? "text-pink-500 underline duration-500":""}`}>{name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="flex mx-2 items-center">
                <h4 className="flex relative">
                    <span className="text-red-600 text-xl font-bold flex">(0)</span>
                    <BiCartDownload className="text-white cursor-pointer " size={30} />
                </h4>
                <div onClick={()=>{setOpen(!open)}} className={`text-white md:hidden visible  flex items-center mr-4 ml-2 justify-center`}>
                    {!open ? <GiHamburgerMenu className="" size={25} />
                    :<IoClose className="font-bold" size={25} />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;