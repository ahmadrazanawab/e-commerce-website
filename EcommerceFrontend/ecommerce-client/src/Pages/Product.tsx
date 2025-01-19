import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { ProductDetailsItem } from "../components/ProductItemDefine";
const Product = () => {
    const [product, setProduct] = useState<ProductDetailsItem[]>([]);
    const host = "http://localhost:7002";
    const getAllProduct = async () => {
        try {
            const response = await axios.get(`${host}/api/product/v2/getProduct`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data.products);
            setProduct(response.data.products);
        } catch (error) {
            console.log("fetch product error...", error);
        }
    }
    useEffect(() => {
        getAllProduct();
    }, []);


    return (
        <div className="bg-gray-200 py-4">
            <h5 className="text-center mb-4 text-2xl font-serif underline "> All Product </h5>
            <div className="flex justify-center flex-wrap">
                {
                    product.map((product: ProductDetailsItem) => {
                        return <div key={product._id}
                            className="flex mx-4 sm:my-0 my-2 border-[1px] border-gray-500 p-4 bg-slate-50 shadow-sm rounded ">
                            <ProductItem product={product} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Product;