import React from 'react'
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from "../Redux/ProductSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios';

const ViewItemDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product?.product || location.state?.product;
    const dispatch = useDispatch();
    const host = "http://localhost:7002";
    
    const AddtoCart = async () => {
        const response = await axios.post(`${host}/api/product/v2/addtocart`, {
            productId: product._id,
            quantity: 1,
        }, {
            headers: {
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem('token') || "",
            }
        });
        console.log(response.data);
    }

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: string) => {
        e.preventDefault(); 
        console.log(dispatch(addToCart(product)));
        dispatch(addToCart(product));
        AddtoCart();
        alert("Cart has been added successfully");
    }
    const handleBuyProduct = (product:any) => {
        navigate(`/checkout/${product._id}`, { state: { product }});
    }
    const formatDate = (date:any) => {
        const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
        const year = date.getFullYear();
        const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
        return `${day}/${month}/${year}  ${date.toLocaleDateString("en-US", options)}`;
        
    };
    const currentDate = new Date();
    return (
        <>
            <section className='bg-gray-50 w-full pt-24 pb-4 flex md:flex-row flex-col'>
                <div className='flex md:flex-row flex-col md:justify-between justify-center mx-2'>
                    <div className='bg-gray-400 border-[1px] mx-1 border-white shadow-sm'>
                        <img src={product.images} alt="No item images" className='w-[600px] h-[400px]' />
                    </div>
                    <div className='flex flex-col justify-between px-2 py-1 w-full bg-white'>
                        <h4 className='md:text-2xl sm:text-xl font-semibold font-serif'> {product.name}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi totam accusantium fuga, omnis laborum earum iure. Minima deserunt aliquam quas.
                        </h4>
                        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis ullam nesciunt id.</p>
                        <p className='flex text-xl font-bold items-center'>
                            <span className='text-red-400 font-thin text-2xl'>-50%</span>
                            <span className='ml-2'><LiaRupeeSignSolid size={20} /></span>
                            <span className='text-2xl font-bold'>{product.price}</span>
                        </p>
                        <p className='flex items-center text-sm'>
                            <span className='text-gray-500'>M.R.P</span>
                            <span className='text-gray-500 '><LiaRupeeSignSolid className='line-through' size={14} /></span>
                            <span className='text-gray-500 line-through font-semibold'>1499</span>
                        </p>
                        <div className='flex md:flex-row flex-col md:justify-between justify-center items-center py-2 my-2 mx-2'>
                            <div className='p-2 rounded shadow-sm bg-slate-100 my-1 mx-1'>
                                <h4 className='font-semibold'>Cashback</h4>
                                <p>Upto ₹22.47 cashback as Apna Shope Pay Balance when…</p>
                                <p>1 offer</p>
                            </div>
                            <div className='p-2 rounded shadow-sm bg-slate-100 my-1 mx-1'>
                                <h4 className='font-semibold'>Bank Offer</h4>
                                <p>Upto ₹74.90 discount on select Credit Cards, ICICI…</p>
                                <p>3 offer</p>
                            </div>
                            <div className='p-2 rounded shadow-sm bg-slate-100 my-1 mx-1'>
                                <h4 className='font-semibold'>Partner Offer</h4>
                                <p>Get GST invoice and save up to 28% on business purchases.</p>
                                <p>1 offer</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='flex flex-col justify-between mx-2 p-2 bg-gray-50 border-[1px] rounded border-gray-400 '>
                    <p className='text-xl flex items-center md:my-0 my-2'>
                        <span><LiaRupeeSignSolid className='' size={14} /></span>
                        <span className='text-xl font-bold'>{product.price}</span>
                    </p>

                    <div className="flex items-center md:my-0 my-1"> <label htmlFor="qty">Qty:</label>
                        <button
                            // onClick={() => { dispatch(decrementQuantity(product._id)) }}
                            className="px-2 border-[1px] border-gray-900 outline-none mx-2 rounded bg-gray-400 text-white font-bold"
                        >
                            -
                        </button>
                        <h4 className="text-red-500 text-xl">{1}</h4>
                        <button
                            // onClick={() => dispatch(incrementQuantity(product._id))}
                            className="px-2 border-[1px] outline-none border-gray-900 mx-2 rounded bg-gray-400 text-white font-bold"
                        >
                            +
                        </button>
                    </div>
                    <p className='text-sm  md:my-0 my-1'>FREE delivery <span className='font-semibold'>{formatDate(currentDate)}</span> Details</p>
                    <div className="flex flex-col my-2">
                        <button
                            onClick={(e) => { handleAddToCart(e,product._id) }}
                            className="border-[1px]  border-gray-900 bg-yellow-300  my-1  rounded-3xl px-2 py-1 w-full">Add to Cart</button>
                        <button
                            onClick={() => { handleBuyProduct(product) }}
                            className="border-[1px] text-center border-gray-900 bg-yellow-500  my-1 rounded-3xl px-2 py-1 w-full">Buy Now</button>
                    </div>
                </div>
            </section>
            <div className='flex w-full my-2 justify-center'>
                <Link to="/product" className='px-2 py-1 border-[1px] border-gray-500 rounded'>Get All Products</Link>
            </div> 
        </>
    )
}

export default ViewItemDetails
