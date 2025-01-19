import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../Redux/ProductSlice';
import { ProductItem } from '../components/ProductItemDefine';
import axios from 'axios';

const AddProductItem: React.FC = () => {
    const dispatch = useDispatch();
    const host = "http://localhost:7002";
    const [item, setItem] = useState<Omit<ProductItem, '_id'>>({
        name: '',
        description: '',
        images: '', // This will store the image file
        price: 0,
        stock: 0,
        category: '',
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null); // For preview purposes
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: name === 'price' || name === 'stock' ? +value : value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the uploaded file
        if (file) {
            setImageFile(file);
            // setItem({ ...item, images: file }); // Store the file object
            setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL for display
        }
    };

    const AddProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('name', item.name);
            formData.append('description', item.description);
            formData.append('price', item.price.toString());
            formData.append('stock', item.stock.toString());
            formData.append('category', item.category);

            // if (item.images) {
            //     formData.append('images', item.images  as unknown as File); // Add the image file to the FormData
            // }
            if (imageFile) {
                formData.append('images', imageFile); // Add the image file to FormData
            }

            const response = await axios.post(`${host}/api/product/v2/addProduct`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODhhMWJlNWFmNTExM2I2OTVmMmE0ZCIsImlhdCI6MTczNzI1OTE5MywiZXhwIjoxNzM3MjYyNzkzfQ.yldn6VdPRatTe8uUZR3BvoiCoQNEUvz-FiHB8g4WtNo",
                }
            });

            console.log("Product added successfully: ", response.data);
        } catch (error) {
            console.error("Add product error...", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: ProductItem = {
            _id: Date.now(),
            ...item,
        };
        dispatch(addProduct(newProduct));
        await AddProduct();
        setItem({
            name: '',
            description: '',
            images: '',
            price: 0,
            stock: 0,
            category: '',
        });
        setPreviewImage(null); // Reset the image preview
    };

    return (
        <section className='py-4 bg-slate-400'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col sm:mx-20 mx-4 bg-slate-50 p-4 shadow-sm rounded my-3'
            >
                <input
                    name="name"
                    value={item.name || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Name"
                    required
                />
                <textarea
                    name="description"
                    value={item.description || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Description"
                    required
                />
                <input
                    type='file'
                    accept="image/*"
                    name="images"
                    className='py-2 px-2 '
                    onChange={handleImageChange}
                    placeholder="Image"
                />
                {/* Show image preview */}
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
                    value={item.price || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    name="stock"
                    value={item.stock || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Stock"
                    required
                />
                <input
                    name="category"
                    value={item.category || ""}
                    onChange={handleChange}
                    className='py-2 px-2 border-[1px] border-gray-900 my-2 rounded'
                    placeholder="Category"
                    required
                />
                <button
                    type="submit"
                    className='border-[1px] bg-sky-400 text-white px-2 py-1 my-2 border-gray-900 rounded'
                >
                    Add Product
                </button>
            </form>
        </section>
    );
};

export default AddProductItem;
