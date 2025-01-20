import { Link } from "react-router-dom";
import Order from "../components/Order";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

const Home = () => {
    const productDetails = useSelector((state: RootState) => (state.products));
    const UserDetails = useSelector((state: RootState) => (state.users));
    return (
        <div className="pt-20 h-[100vh] pb-4 flex flex-col items-center  bg-slate-300">
            <h4 className="text-2xl font-serif my-2">Admin Panel</h4>
            <div className="flex justify-center flex-wrap">
                <Order />

                <div className="flex flex-col mx-2 my-2 justify-center  bg-slate-50 rounded max-w-[400px]  p-2 ">
                    <h4 className="text-center">Product Details</h4>
                    <p className="bg-slate-100 font-bold py-1 rounded text-center">Total Product: ({productDetails.products.length})</p>
                    <div className="flex justify-center">
                        <Link to="/product" className="px-2 my-2 py-1 shadow-sm text-white bg-sky-400 rounded">Show Product List</Link>
                    </div>
                    
                </div>
                <div className="flex mx-2 my-2 flex-col justify-center  bg-slate-50 rounded max-w-[400px]  p-2 ">
                    <h4 className="text-center">User Details</h4>
                    <p className="bg-slate-100 font-bold py-1 rounded text-center">Total User : ({UserDetails.users.length})</p>
                    <div className="flex justify-center">
                        <Link to="/getAllUser" className="px-2 my-2 py-1 shadow-sm text-white bg-sky-400 rounded">User</Link>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Home;