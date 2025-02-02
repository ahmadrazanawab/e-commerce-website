
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../Redux/ProductSlice';
import { setProductItem, setIsEditItem } from "../Redux/ItemsSlice";
import axios from 'axios';
import { RootState } from '../Redux/Store';


const AddProductItem: React.FC = () => {

    const dispatch = useDispatch();
    const host = "http://localhost:7002";
    const items = useSelector((state: RootState) => (state.items.item));
    const isEditItem = useSelector((state: RootState) => (state.items.isEditItem));
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Handle input field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setProductItem({ ...items, [name]: value }));
    };

    // Handle file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpdateItem = async () => {
        if (!items || !items._id) {
            console.error("Error: Product data is missing or invalid.");
            return;
        }
        const _id = items._id;
        console.log(_id);
        const formData = new FormData();
        formData.append('name', items.name);
        formData.append('description', items.description);
        formData.append('price', items.price.toString());
        formData.append('mrpPrice', items.mrpPrice.toString());
        formData.append('disPercentage', items.disPercentage.toString());
        formData.append('stock', items.stock.toString());
        formData.append('category', items.category);

        if (imageFile) {
            formData.append('images', imageFile);
        }

        try {
            let response = await axios.put(`${host}/api/product/v2/updateProduct/${_id}`, formData, {
                headers: {
                    "Content-Type":"application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODhhMWJlNWFmNTExM2I2OTVmMmE0ZCIsImlhdCI6MTczODIxNjQwOH0.5EZfnFRRfJ_3AhEsTZp5JKl_YP40M8VvGYMNfv0G2hs"
                }
            });

            const updatedItem = response.data?.product;
            console.log("Updated Item:", updatedItem);
            dispatch(updateProduct(items));
            dispatch(setProductItem(items));
            dispatch(setIsEditItem(false));

        } catch (error: any) {
            console.error("Update failed:", error.response?.data || error.message);
        }
    };


    const handleSubmitAddOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updating Product with ID:", items._id);
        // if (!items._id) {
        //     console.error("Error: _id is missing in the item.");
        //     return;
        // }

        const formData = new FormData();
        formData.append('name', items.name);
        formData.append('description', items.description);
        formData.append('price', items.price.toString());
        formData.append('mrpPrice', items.mrpPrice.toString());
        formData.append('disPercentage', items.disPercentage.toString());
        formData.append('stock', items.stock.toString());
        formData.append('category', items.category);


        if (imageFile) {
            formData.append('images', imageFile); // Append only if new image is selected
        }
        // console.log("Submitting Data:", Object.fromEntries(formData.entries())); 
        try {
            // Update form
            let response;
            if (isEditItem) {
                await handleUpdateItem();
                dispatch(setIsEditItem(false));
                console.log("Updating existing product...", items);
            } else {
                // ADD NEW PRODUCT
                response = await axios.post(`${host}/api/product/v2/addProduct`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODhhMWJlNWFmNTExM2I2OTVmMmE0ZCIsImlhdCI6MTczODIxNjQwOH0.5EZfnFRRfJ_3AhEsTZp5JKl_YP40M8VvGYMNfv0G2hs"
                    }
                });
                let newItem = response.data?.newProduct;
                console.log(newItem);
                dispatch(addProduct(newItem));
            }

            // Reset form after submission
            dispatch(setProductItem({
                _id:'',
                name: '',
                description: '',
                images: '',
                price: 0,
                mrpPrice: 0,
                disPercentage: 0,
                stock: 0,
                category: '',
            }));
            setPreviewImage(null);
            setImageFile(null);
            setIsEditItem(false);

        } catch (error: any) {
            console.error("Error saving product:", error.response?.data || error.message);
        }
    };

    return (
        <section className='py-4 bg-slate-400'>
            <form
                onSubmit={handleSubmitAddOrUpdate}
                className='flex flex-col sm:mx-20 mx-4 bg-slate-50 p-4 shadow-sm rounded my-3'
            >
                <input
                    name="name"
                    value={items.name || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Name"
                    required
                />
                <textarea
                    name="description"
                    value={items.description || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Description"
                    required
                />
                <input
                    type='file'
                    accept="image/*"
                    name="images"
                    className='py-2 px-2'
                    onChange={handleImageChange}
                    placeholder="Image"
                />
                {previewImage && (
                    <div className="my-2">
                        <h3 className="text-gray-700">Image Preview:</h3>
                        <img
                            src={previewImage}
                            alt="Uploaded"
                            className="rounded border-gray-300 w-[150px] h-[100px] shadow-sm"
                        />
                    </div>
                )}
                <input
                    type="number"
                    name="price"
                    value={items.price || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    name="mrpPrice"
                    value={items.mrpPrice || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="M.R.P Price"
                    required
                />
                <input
                    type="number"
                    name="disPercentage"
                    value={items.disPercentage || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Discount Percentage"
                    required
                />
                <input
                    type="number"
                    name="stock"
                    value={items.stock || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Stock"
                    required
                />
                <input
                    name="category"
                    value={items.category || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Category"
                    required
                />
                <button
                    type='submit'
                    className={`border-[1px] ${isEditItem ? "bg-green-600" : "bg-sky-400"} text-white px-2 py-1 my-2 border-gray-900 rounded`}
                >
                    {isEditItem ? "Save Product" : "Add Product"}
                </button>
            </form>
        </section>
    );
};

export default AddProductItem;

