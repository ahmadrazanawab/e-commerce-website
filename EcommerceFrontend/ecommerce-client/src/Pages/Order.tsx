import axios from 'axios';
import React, { useEffect } from 'react';
import { setOrderItems } from "../Redux/UserAddressSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';


const Order: React.FC = () => {
    const host = "http://localhost:7002";
    const dispatch = useDispatch();
    const orderedItems = useSelector((state: RootState) => state.user);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${host}/api/product/v2/fetchallItems`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token') || "",
                },
            });
            const orderItems = response.data.orders;
            dispatch(setOrderItems(orderItems));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <section className='pt-24 f bg-gray-200 flex-col justify-center items-center'>
            <h1 className='text-center sm:text-2xl font-bold'>Your Orders</h1>
            <div className='flex sm:justify-around w-full justify-center flex-wrap my-2 mx-2 p-1 shadow-sm bg-gray-200 rounded'>
                {
                    orderedItems.orders.map((order: any) => {
                        return <div key={order._id} className='flex mx-2 sm:w-[350px] max-w-[400px] flex-col  my-2   p-4 shadow-sm bg-white border-[1px] border-gray-500 rounded'>
                            <div className='my-1 flex justify-between'>
                                {
                                    order.products?.map((product: any) => (
                                        <ul key={product?.product?._id} className='my-2'>
                                            <li className='flex justify-start  sm:w-[300px] max-w-[300px] h-[200px]'>
                                                <img src={product?.product?.images}
                                                className='sm:w-[280px] max-w-[300px] h-[200px]'    alt="No item images" />
                                            </li>
                                            <li className='font-semibold'>{product?.product?.name} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus architecto earum molestias!</li>
                                            <li>Price: <strong>₹{product?.product?.price}</strong></li>
                                            <li className='font-semibold'>Quantity:{product?.quantity}</li>
                                            <li><strong>Status:</strong>{order.status}</li>
                                            <li><strong>Total Amount : ₹{order.totalAmount}</strong></li>
                                        </ul>

                                    ))
                                }
                            </div>
                            <div className='my-1'>
                                <p className='text-sm font-semibold'>Address:</p>
                                <h1 className='text-xl font-semibold'>{order?.shippingAddress?.fullname}</h1>
                                <p>{order?.shippingAddress?.HomeAddress},{order?.shippingAddress?.Area}, {order?.shippingAddress?.landmark}, {order?.shippingAddress?.townorcity},{order?.shippingAddress?.state},{order?.shippingAddress?.country}</p>
                                <p>{order?.shippingAddress?.state}</p>
                                <p className='font-semibold'>{order?.paymentMethod}</p>
                            </div>

                        </div>
                    })
                }
            </div>
        </section>
    );
};

export default Order;