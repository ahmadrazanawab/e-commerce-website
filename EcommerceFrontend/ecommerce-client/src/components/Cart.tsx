import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { incrementQuantity, decrementQuantity, deleteCart} from "../Redux/ProductSlice";


const Cart = () => {
    const Carts = useSelector((state: RootState) => (state.products.cart));
    const dispatch = useDispatch()
    
    const totalProductsPrice = Carts.reduce((totalPrice, item: any) => {
        return totalPrice + item.price * item.quantity;
    }, 0);

    const handleDeleteCart = (cart: any) => {
        dispatch(deleteCart(cart));
        alert("Cart has been removed successfully");
    }

    return (
        <section className="pt-24 min-h-[100vh] bg-slate-300 mx-4 pb-6 flex justify-center flex-wrap">
            {
                Carts.length === 0 ? <h4 className="text-2xl font-serif">Your Apna Shope Cart is empty</h4> :
                    Carts.map((cart) => {
                        return <div key={cart._id} className="bg-slate-50 p-4  rounded mx-2 my-2 md:w-[300px]  min-w-[200px]">
                            <div className="flex items-center justify-center">
                                <img src={cart.images}
                                    className="md:w-[300px] sm:w-[200px] w-[250px] md:h-[250px] h-[200px] rounded" alt="No image" />
                            </div>
                            <h4 className="text-xl font-sans mt-2">{cart.name}</h4>
                            <p className="text-sm font-thin">{cart.description}</p>
                            <p className="flex items-center">
                                <span><LiaRupeeSignSolid /></span>
                                <span className="text-xl font-bold">{cart.price}</span>
                                <span className="flex items-center mx-2 text-sm text-gray-600">M.R.P:
                                    <span className="flex items-center line-through "><LiaRupeeSignSolid />1400</span>
                                    <span className="text-black ml-1">(80% off)</span>
                                </span>
                            </p>
                            <p>stock:{cart.stock}</p>
                            <div className="flex items-center"> <label htmlFor="qty">Qty:</label>
                                <button onClick={() => { dispatch(decrementQuantity(cart._id)) }}
                                    disabled={cart.quantity === 1}
                                    className={`px-2 border-[1px] border-gray-900 outline-none mx-2 rounded  text-white font-bold text-xl ${cart.quantity === 1 ? 'bg-gray-200' : 'bg-gray-400'} `}
                                >
                                    -
                                </button>
                                <h4 className="text-red-500 text-xl">{cart.quantity}</h4>
                                <button onClick={() => { dispatch(incrementQuantity(cart._id)) }}
                                    className="px-2 text-xl border-[1px] outline-none border-gray-900 mx-2 rounded bg-gray-400 text-white font-bold"
                                >
                                    +
                                </button>
                            </div>
                            <div className="my-1">
                                <h4 className="font-semibold text-sm">Amount : {cart.TotalAmount * cart.quantity}</h4>
                            </div>
                            <p className="text-sky-500 underline text-sm my-1 cursor-pointer">View Details</p>
                            <div className="flex flex-col my-2">
                                <button onClick={() => { handleDeleteCart(cart._id) }}
                                    className="border-[1px] border-gray-900 bg-red-400  my-1 rounded-3xl px-2 py-1 w-full">Delete Cart</button>
                                <button 
                                    className="border-[1px] border-gray-900 bg-yellow-300  my-1 rounded-3xl px-2 py-1 w-full">Buy Now</button>
                            </div>
                        </div>
                    })
            }
            {Carts.length === 0 ? "" : <div className="flex flex-col justify-center items-center rounded py-3  bg-gray-200 w-full my-2 mx-4 ">
                <h1 className="text-2xl font-semibold text-black">Total Amount : {totalProductsPrice}</h1>
                <div className="flex flex-col my-2">
                    <Link to='/' className="border-[1px]  border-gray-900 bg-green-500 text-white my-1 rounded px-2 py-1 w-full">See All Product</Link>
                </div>
            </div>}
        </section>
    )
}
export default Cart;