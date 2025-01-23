import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { setCart, incrementQuantity, decrementQuantity, deleteCart } from "../Redux/ProductSlice";
import axios from "axios";
import { useEffect } from "react";

const Cart = () => {
    const host = "http://localhost:7002"
    const product = useSelector((state: RootState) => (state.products.cart));
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const totalProductsPrice = product.reduce((totalPrice, item: any) => {
        return totalPrice + item.product?.price * item.quantity;
    }, 0);


    const fetchAllCarts = async () => {
        try {
            const response = await axios.get(`${host}/api/product/v2/fetchallcart`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ODlmOTRhY2M5YTQ5MzEzNTZmN2ZkIn0sImlhdCI6MTczNzM3Nzg1M30.GEDeMyHhYmcHEiZE7a9ek2xW1WJG5ZhBUxM7SZPz1rs"
                }
            });

            let fetchCart = response.data.cart.products;
            dispatch(setCart(fetchCart));
            // console.log(response.data.cart.products.product);

        } catch (error) {
            console.log("Fetch cart error...", error);
        }
    };

    useEffect(() => {
        fetchAllCarts();
    }, []);

    const deleteProductFromCart = async (productId: string) => {
        console.log("Deleting product with ID:", productId);
        try {
            const response = await axios.delete(`${host}/api/product/v2/cart/product/${productId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ODlmOTRhY2M5YTQ5MzEzNTZmN2ZkIn0sImlhdCI6MTczNzM3Nzg1M30.GEDeMyHhYmcHEiZE7a9ek2xW1WJG5ZhBUxM7SZPz1rs"
                }
            });
            console.log(response.data);
            let fetchCart= response.data.cart.products;
            return dispatch(setCart(fetchCart));
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }

    }
    const handleDeleteCart = async (productId: string) => {
        try {
            dispatch(deleteCart(productId));
            await deleteProductFromCart(productId);
            fetchAllCarts();
            alert("Cart has been removed successfully");
        } catch (error) {
            console.log("Delete Cart Error ", error);
        }
    }

    const handleBuyProduct = (product:any) => {
        navigate(`/checkout/${product.product?._id}`,{state:{ product }});
        console.log(`/checkout/${product.product?._id}`,product);
    }


    return (
        <section className="pt-24 min-h-[100vh] bg-slate-300 mx-4 pb-6 flex justify-center flex-wrap">
            {
                product.length === 0 ? <h4 className="text-2xl font-serif">Your Apna Shope Cart is empty</h4> :
                    product && product.map((cart: any) => {
                        return <div key={cart._id} className="bg-slate-50 p-4  rounded mx-2 my-2 md:w-[300px]  min-w-[200px]">
                            <div className="flex items-center justify-center">
                                <img src={cart.product?.images || ""}
                                    className="md:w-[300px] sm:w-[200px] w-[250px] md:h-[250px] h-[200px] rounded" alt="No image" />
                            </div>
                            <h4 className="text-xl font-sans mt-2">{cart.product?.name || ""}</h4>
                            <p className="text-sm font-thin">{cart.product?.description || ""}</p>
                            <p className="flex items-center">
                                <span><LiaRupeeSignSolid /></span>
                                <span className="text-xl font-bold">{cart.product?.price || ""}</span>
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
                                <h4 className="font-semibold text-sm">Amount : {cart.product?.price * cart.quantity}</h4>
                            </div>
                            <p className="text-sky-500 underline text-sm my-1 cursor-pointer">View Details</p>
                            <div className="flex flex-col my-2">
                                <button onClick={() => { handleDeleteCart(cart.product?._id) }}
                                    className="border-[1px] border-gray-900 bg-red-400  my-1 rounded-3xl px-2 py-1 w-full">Delete Cart</button>
                                <button onClick={()=>{handleBuyProduct(cart)}}
                                    className="border-[1px] border-gray-900 bg-yellow-300  my-1 rounded-3xl px-2 py-1 w-full">Buy Now</button>
                            </div>
                        </div>
                    })
            }
            {product.length === 0 ? "" : <div className="flex flex-col justify-center items-center rounded py-3  bg-gray-200 w-full my-2 mx-4 ">
                <h1 className="text-2xl font-semibold text-black">Total Amount : {totalProductsPrice}</h1>
                <div className="flex flex-col my-2">
                    <Link to='/' className="border-[1px]  border-gray-900 bg-green-500 text-white my-1 rounded px-2 py-1 w-full">See All Product</Link>
                </div>
            </div>}
        </section>
    )
}
export default Cart;