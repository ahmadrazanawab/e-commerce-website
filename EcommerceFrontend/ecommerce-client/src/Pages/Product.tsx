import { useEffect} from "react";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { setProducts} from "../Redux/ProductSlice";
import { RootState } from "../Redux/Store";
import axios from "axios";


const Product = () => {

    const productValue = useSelector((state: RootState) => (state.products));
    
    const host = "http://localhost:7002";
    const dispatch = useDispatch();
   
    const getAllProduct = async () => {
        try {
            const response = await axios.get(`${host}/api/product/v2/getProduct`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const products = response.data.products;
            dispatch(setProducts(products))
        } catch (error) {
            console.log("fetch product error...", error);
        }
    }
    useEffect(() => {
        getAllProduct();
    }, []);


    return (
        <div className="bg-gray-200 pb-4 md:pt-20 pt-10">
            <h5 className="text-center mb-4 text-2xl font-serif underline "> All Product </h5>
            <div className="flex mx-4 justify-center flex-wrap">
                {
                  productValue.products &&  productValue.products.map((product) => {
                        return <div key={product._id}
                            className="flex mx-1  my-2 border-[1px] border-gray-500 p-2 bg-slate-50 shadow-sm rounded ">
                            <ProductItem product={product} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Product;