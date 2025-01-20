import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import { deleteProduct, setProducts } from "../Redux/ProductSlice";
import axios from 'axios';

const ProductItems: React.FC = () => {

    const productValue = useSelector((state: RootState) => state.products);
    // console.log(productValue);
    const host = "http://localhost:7002";
    const dispatch = useDispatch()

    const DeleteProduct = async (_id: number) => {
        const response = await axios.delete(`${host}/api/product/v2/deleteProduct/${_id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODhhMWJlNWFmNTExM2I2OTVmMmE0ZCIsImlhdCI6MTczNzI4MjUzMCwiZXhwIjoxNzM3Mjg2MTMwfQ.I3ro2PYlQvTSukTc5AzsNvnnpc4AbAgyO8aPDvTmRr8"
            }
        });
        console.log(response.data);
    }

    const handleDelete = async (_id: number) => {
        dispatch(deleteProduct(_id));
        await DeleteProduct(_id);
    };

    const fetchAllProduct = async () => {
        try {
            const response = await axios.get(`${host}/api/product/v2/getProduct/`);
            const products = response.data.products;
            dispatch(setProducts(products));
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }




    useEffect(() => {
        fetchAllProduct();
    }, []);

    return (
        <section>
            <div className='flex md:hidden mx-4 flex-col rounded '>
                {
                    productValue.products.map((product) => {
                        return <div key={product._id} className='flex md:flex-row flex-col  justify-center md:items-start items-center   bg-slate-50 px-4 py-1 border-b-2 border-gray-900  mx-4 rounded shadow-sm'>
                            <img src={product.images} alt='No image product'
                                className='h-[100px]' />
                            <h1 className='flex flex-col md:w-[150px] md:mx-2 p-2'>
                                <span className='font-semibold'>Title</span>
                                <span>{product.name}</span>
                            </h1>

                            <p className='flex flex-col md:w-[400px] md:mx-2 p-2'>
                                <span className='font-semibold'>Description</span>
                                <span>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ipsum iste commodi.
                                    {product.description}
                                </span>
                            </p>
                            <p className=' flex flex-col md:w-[150px] w-[100px] md:mx-2 p-2'>
                                <span className='font-semibold'>Price</span>
                                <span>{product.price}</span>
                            </p>
                            <p className='flex flex-col w-[100px] md:mx-2 p-2'>
                                <span className='font-semibold'>Stock</span>
                                <span>{product.stock}</span>
                            </p>
                            <p className='flex flex-col w-[100px] md:mx-2 p-2'>
                                <span className='font-semibold'>Category</span>
                                <span>{product.category}</span>
                            </p>
                            <div className='flex items-start mx-1  my-4'>
                                <button onClick={() => handleDelete(product._id)}
                                    className='bg-red-500 mx-1 text-white rounded px-2'>
                                    Delete
                                </button>
                                <button className='bg-sky-500 mx-1 text-white rounded px-2'>Update</button>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="md:block hidden">
                <div className='flex justify-center'>
                    <table className="table mx-6 w-full border-collapse border my-3 border-gray-300 bg-slate-50  shadow-sm">
                        <thead>
                            <tr className="border-[1px] border-gray-900 bg-gray-100">
                                <th className="border-[1px] border-gray-900 px-2 py-1 text-left">Picture</th>
                                <th className="border-[1px] border-gray-900 px-2 py-1 text-left">Title</th>
                                <th className="border-[1px] border-gray-900 px-2 py-1 text-left">Description</th>
                                <th className="border-[1px] border-gray-900 px-2 py-1 text-left">Price</th>
                                <th className="border-[1px] border-gray-900 px-2 py-1 text-left">Stock</th>
                                <th className="border-[1px] border-gray-900 px-2 py-1 text-left">Category</th>
                                <th className="border-[1px] border-gray-900 px-2 py-1 text-left">Manage Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productValue.products.map((pro) => (
                                <tr key={pro._id} className="border-[1px] border-gray-900 hover:bg-gray-50">
                                    <td className="border-[1px] border-gray-900 px-2 py-1">
                                        <img
                                            src={pro.images}
                                            className="md:w-[200px] md:h-[150px] w-[100px] h-auto rounded"
                                            alt="product"
                                        />
                                    </td>
                                    <td className="border-[1px] border-gray-900 px-2 py-1">{pro.name}</td>
                                    <td className="border-[1px] border-gray-900 px-2 py-1">{pro.description}</td>
                                    <td className="border-[1px] border-gray-900 px-2 py-1">{pro.price}</td>
                                    <td className="border-[1px] border-gray-900 px-2 py-1">{pro.stock}</td>
                                    <td className="border-[1px] border-gray-900 px-2 py-1">{pro.category}</td>
                                    <td className="border-[1px] border-gray-900 px-2 py-1">
                                        <button onClick={() => handleDelete(pro._id)}
                                            className="bg-red-500 mx-1 my-1 text-white rounded px-2 py-1 text-sm">Delete</button>
                                        <button className="bg-yellow-500 mx-1 my-1 text-white rounded px-2 py-1 text-sm">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    )
}

export default ProductItems


