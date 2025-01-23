import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Model from "../components/Model/Model";
import { addUserShippingAdress, addOrder, setShippingAddress } from "../Redux/UserAddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { ShippingAddress } from "../components/ProductItemDefine"
import { RootState } from "../Redux/Store";
import { incrementQuantity, decrementQuantity } from "../Redux/ProductSlice";

import axios from "axios";
const Checkout: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [userAddress, setUserAddress] = useState<Omit<ShippingAddress, '_id'>>({
        fullname: '',
        mobileno: 0,
        pincode: 0,
        HomeAddress: '',
        Area: '',
        landmark: '',
        townorcity: '',
        state: '',
        country: ''
    });
    const host = "http://localhost:7002"
    const dispatch = useDispatch();
    const addressValue = useSelector((state: RootState) => (state.user));
    const location = useLocation();
    // const product = location.state?.product; // Access the passed product
    const product = location.state?.product?.product || location.state?.product;
    const cartQuantity = location.state?.cart;
    console.log(cartQuantity);
    const navigate = useNavigate();
    useEffect(() => {
        if (!product) {
            navigate('/'); // Redirect to the home or product list page
        }
    }, [product, navigate])

    const showModalBtn = () => {
        setShowModal(true)
    }

    const onClosed = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setShowModal(false);
    }

    const onchange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
    }

    const handleOrderSubmission = async () => {
        if (!selectedAddress) {
            alert("Please select a delivery address.");
            return;
        }
        const selectedAddressData = addressValue.user.find((addr) => addr._id === selectedAddress);

        if (!selectedAddressData) {
            alert("Selected address not found. Please try again.");
            return;
        }
        const orderData = {
            products: [
                {
                    // Ensure `product._id` is defined
                    product: product._id,
                    // Replace with actual selected quantity
                    quantity: 1,
                },
            ],
            // Use the selected address data
            shippingAddress: selectedAddressData,
            // Payment method
            paymentMethod: "Pay on Delivery",
            // Replace with actual total amount
            totalAmount: product.price,
        };
        console.log("Order Data:", orderData);

        try {
            const response = await axios.post(`${host}/api/product/v2/orderProduct`, orderData, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ODlmOTRhY2M5YTQ5MzEzNTZmN2ZkIn0sImlhdCI6MTczNzM3Nzg1M30.GEDeMyHhYmcHEiZE7a9ek2xW1WJG5ZhBUxM7SZPz1rs"
                }
            });
            console.log("Order submitted successfully:", response.data);
            dispatch(addOrder(response.data));
            alert("Order placed successfully!");

        } catch (error) {
            console.error("Error while submitting the order:", error);
        }
    }
    // http://localhost:7002
    const fetchShippingAdress = async () => {
        try {
            const response = await axios.get(`${host}/api/product/v2/fetShippingAddress`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ODlmOTRhY2M5YTQ5MzEzNTZmN2ZkIn0sImlhdCI6MTczNzM3Nzg1M30.GEDeMyHhYmcHEiZE7a9ek2xW1WJG5ZhBUxM7SZPz1rs"
                }
            });

            const userAddress = response.data.orders;
            console.log(userAddress);
            dispatch(setShippingAddress(userAddress));
        } catch (error) {
            console.log("Fetch shipping address error..", error);
        }
    }

    useEffect(() => {
        fetchShippingAdress();
    }, [selectedAddress]);

    // useEffect(() => {
    //     const fetchShippingAddresses = async () => {
    //         try {
    //             const response = await axios.get(`${host}/api/product/v2/fetShippingAddress`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ODlmOTRhY2M5YTQ5MzEzNTZmN2ZkIn0sImlhdCI6MTczNzM3Nzg1M30.GEDeMyHhYmcHEiZE7a9ek2xW1WJG5ZhBUxM7SZPz1rs"
    //                 }
    //             });

    //             // Check if the response data has the expected format
    //             if (!response.data.orders) {
    //                 console.error("Unexpected response format from API");
    //                 return;
    //             }
    //             const userAddress = response.data.orders;
    //             console.log(userAddress);
    //             dispatch(setShippingAddress(userAddress));
    //         } catch (error) {
    //             console.log("Fetch shipping address error..", error);
    //         }
    //     };
    //     fetchShippingAddresses();
    // }, [selectedAddress]);

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: ShippingAddress = {
            _id: Date.now().toString(),
            ...userAddress,
        };
        dispatch(addUserShippingAdress(newProduct));
        console.log(newProduct);
    }


    return (
        <section className="sm:bg-slate-50">
            <div className="bg-slate-200 flex justify-around py-4 w-full">
                <h4 className="flex items-center"><span className="flex absolute sm:left-4 left-1 sm:top-6 top-5"><Link to="/"><IoMdArrowRoundBack className="size-6" /></Link> </span>
                    <span className="sm:text-2xl text-xl font-semibold">ApnaShope</span>.in</h4>
                <h5 className="sm:block hidden text-2xl font-serif">Checkout</h5>
                <p><span><FaLock className="text-gray-600 size-6" /></span></p>
            </div>

            {/* Start Model */}

            <Model isVisible={showModal} onClose={() => setShowModal(false)} >
                <div className={`mb-4 px-6 text-left  `}>
                    <div className="bg-gray-200 rounded  py-2 px-2 my-2">
                        <h4 className="font-serif">Enter a new delivery address</h4>
                    </div>
                    <h3 className={`mb-1 mt-2 text-xl font-medium`}>Add a new address</h3>
                    <form action="" className={`space-y-1`}>
                        <div>
                            <label htmlFor="country" className={`block mb-2 text-sm font-medium`}>Country/Region</label>
                            <select value={userAddress.country}
                                onChange={onchange}
                                name="country" id="country" className="w-full border-[1px] bg-gray-200 rounded p-2 outline-none border-gray-600">
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="US">US</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fullName" className={`block mb-2 text-sm font-medium`}>Full Name (First and Last name)</label>
                            <input type="text"
                                value={userAddress.fullname || ""}
                                onChange={onchange}
                                name="fullname" id="fullName"
                                className={`border-[2px] text-gray-900 focus:ring-blue-500 focus:border-blue-500  outline-none  text-sm rounded-lg  block w-full p-2`} />
                        </div>
                        <div>
                            <label htmlFor="mobileNo" className={`block mb-2 text-sm font-medium`}>Mobile number</label>
                            <input type="number"
                                value={userAddress.mobileno || ""}
                                onChange={onchange}
                                name="mobileno" id="number"
                                className={`border-[2px] text-gray-900 focus:ring-blue-500 focus:border-blue-500  outline-none  text-sm rounded-lg  block w-full p-2`} />
                        </div>
                        <div>
                            <label htmlFor="Pincode" className={`block mb-2 text-sm font-medium`}>Pincode</label>
                            <input type="number"
                                value={userAddress.pincode || ""}
                                onChange={onchange}
                                name="pincode" id="pincode"
                                className={`border-[2px] text-gray-900 focus:ring-blue-500 focus:border-blue-500  outline-none  text-sm rounded-lg  block w-full p-2`}
                                placeholder="6 digit [0-9] Pin code" />
                        </div>
                        <div>
                            <label htmlFor="HomeAddress" className={`block mb-2 text-sm font-medium`}>Flat,House no.,Building,Company,Apartment</label>
                            <input type="text"
                                value={userAddress.HomeAddress || ""}
                                onChange={onchange}
                                name="HomeAddress" id="addressHome"
                                className={`border-[2px] text-gray-900 focus:ring-blue-500 focus:border-blue-500  outline-none  text-sm rounded-lg  block w-full p-2`} />
                        </div>
                        <div>
                            <label htmlFor="Area" className={`block mb-2 text-sm font-medium`}>Area,Street,Sector,Village</label>
                            <input type="text"
                                value={userAddress.Area || ""}
                                onChange={onchange}
                                name="Area" id="townorvillage"
                                className={`border-[2px] text-gray-900 focus:ring-blue-500 focus:border-blue-500  outline-none  text-sm rounded-lg  block w-full p-2`} />
                        </div>
                        <div>
                            <label htmlFor="landmark" className={`block mb-2 text-sm font-medium`}>Landmark</label>
                            <input type="text"
                                value={userAddress.landmark || ""}
                                onChange={onchange}
                                name="landmark" id="landmark"
                                className={`border-[2px] text-gray-900 focus:ring-blue-500 focus:border-blue-500  outline-none  text-sm rounded-lg  block w-full p-2`}
                                placeholder="Eg.near hospital or masjid or park" />
                        </div>
                        <div className="flex sm:justify-between sm:flex-row flex-col">
                            <div className="w-full sm:mx-1">
                                <label htmlFor="townorcity" className={`block mb-2 text-sm font-medium`}>Town/City</label>
                                <input type="text"
                                    value={userAddress.townorcity || ""}
                                    onChange={onchange}
                                    name="townorcity" id="townorcity"
                                    className={`border-[2px] text-gray-900 focus:ring-blue-500 focus:border-blue-500  outline-none  text-sm rounded-lg  block w-full p-2`}
                                    placeholder="town or city" />
                            </div>
                            <div className="w-full sm:mx-1">
                                <label htmlFor="state" className={`block mb-2 text-sm font-medium`}>State</label>
                                <select name="state" id="state"
                                    value={userAddress.state}
                                    onChange={onchange}
                                    className="px-2 w-full py-2 border-[2px] text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-sm rounded  outline-none">
                                    <option value="">Select State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                            </div>
                        </div>
                        <div onClick={onClosed}>
                            {/* <button className={`mx-1 bg-cyan-600 text-slate-50 font-bold px-2 py-1 rounded-md shadow-md hover:scale-95`}>Cancel</button> */}
                            <button onClick={handleAddAddress}
                                className={`bg-yellow-400 mt-4 text-black  w-full px-2 py-1 rounded-md shadow-md hover:scale-95`}>
                                Save Address
                            </button>
                        </div>

                    </form>
                </div>
            </Model>

            {/* End Model */}
            <div className="flex flex-col justify-center items-center mx-1 p-2">
                <div className="sm:w-3/4 w-full text-xl font-semibold my-1">
                    <h1 className="sm:text-xl text-sm"><span className="font-bold">1.</span> Select a delivery Address </h1>
                </div>
                <div className="p-4 sm:w-3/4 w-full bg-white mx-1 shadow-sm border-[1px] border-gray-700 rounded">
                    <h4 className="text-xl font-semibold">Your Addresses</h4><hr className="" />
                    <div className="flex flex-col h-full">
                        {
                            addressValue.user.map((user: any) => {
                                return <div key={user._id} className="flex items-center bg-red-50 mx-1 p-3 mt-2 mb-1 rounded shadow-sm border-[2px] border-red-100">
                                    <span>
                                        <input
                                            type="radio"
                                            name="address"
                                            value={user._id}
                                            checked={selectedAddress === user._id}
                                            onChange={() => setSelectedAddress(user._id)}
                                            className="mr-2 checked:text-green-600"
                                        />
                                    </span>
                                    <p className="flex md:flex-row flex-col flex-wrap">
                                        <span className="font-semibold mx-1">{user.shippingAddress?.fullname || user.fullname}</span>
                                        <span>
                                            {user.HomeAddress || user.shippingAddress?.HomeAddress},
                                            {user.Area || user.shippingAddress?.Area},
                                            {user.landmark || user.shippingAddress?.landmark},
                                            {user.townorcity || user.shippingAddress?.townorcity},
                                            {user.state || user.shippingAddress?.state},
                                            {user.pincode || user.shippingAddress?.pincode},
                                            {user.country || user.shippingAddress?.country}
                                        </span>
                                    </p>
                                </div>
                            })
                        }

                    </div>
                    <p className="flex items-center text-cyan-600"><span><FaPlus /> </span><button onClick={showModalBtn}>Add a new address</button></p>
                </div>
                <div className="flex justify-between sm:w-3/4 mx-1 w-full items-center mt-4 pb-2">
                    <h1 className="sm:text-xl font-semibold">Payment Method</h1>
                    <p className="text-sm text-gray-700">Pay on delivery (Cash/Cart)</p>
                    <button className="text-cyan-600">change</button>
                </div>
                <div className="flex justify-between sm:w-3/4 w-full mx-1 items-center mt-4 pb-2">
                    <h1 className="sm:text-xl font-semibold">Items and delivery</h1>
                    <div className="flex md:flex-row flex-col text-sm text-gray-800">
                        <div className="w-[150px]">
                            <img src={product.images} alt="No image" />
                        </div>
                        <div className="mx-1">
                            <h2 className="md:text-xl font-bold">{product.name}</h2>
                            <p className="text-sm">{product.description}</p>
                            <div className="flex items-center"> <label htmlFor="qty">Qty:</label>
                                <button onClick={() => { dispatch(decrementQuantity(product._id)) }}

                                    className="px-2 border-[1px] border-gray-900 outline-none mx-2 rounded bg-gray-400 text-white font-bold"
                                >
                                    -
                                </button>
                                <h4 className="text-red-500 text-xl">1</h4>
                                <button
                                    onClick={() => dispatch(incrementQuantity(product._id))}
                                    className="px-2 border-[1px] outline-none border-gray-900 mx-2 rounded bg-gray-400 text-white font-bold"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-xl">Price: <span className="font-semibold text-xl"> {product.price}</span></p>
                        </div>
                    </div>
                    <button className="md:block hidden text-sm text-gray-400">review order</button>
                </div>
                <div className="flex justify-center mt-4 pb-2 sm:w-3/4 w-full mx-2">
                    <button onClick={handleOrderSubmission} className="text-xl font-semibold w-full bg-yellow-500 text-black px-2 py-1 rounded outline-none">Order Now</button>
                </div>
            </div>
        </section>
    )
};

export default Checkout;