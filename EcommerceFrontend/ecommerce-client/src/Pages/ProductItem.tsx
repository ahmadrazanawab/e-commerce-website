import { useDispatch, useSelector } from "react-redux";
import { ProductDetailsItem } from "../components/ProductItemDefine";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RootState } from "../Redux/Store";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/ProductSlice";
import axios from "axios";

interface ProductProps {
    product: ProductDetailsItem;
}

const ProductItem: React.FC<ProductProps> = (props) => {

    const host = "http://localhost:7002";
    const { product } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state: RootState) => state.products.cart);

    const cartItem = cart.find((item) => item._id === product._id);


    const AddtoCart = async () => {
        const response = await axios.post(`${host}/api/product/v2/addtocart`, {
            productId: product._id,
            quantity: cartItem?.quantity || 1
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token') || "",
            }
        });
        console.log(response.data);
    }

    const handleAddToCart = (product: any) => {
        if (localStorage.getItem('token')) {
            dispatch(addToCart(product));
            AddtoCart();
            alert("Product has been added to cart successfuly");
        }
        else {
            navigate('/signin');
        }
    }
    const handleBuyItem = (product: ProductDetailsItem) => {
        if (localStorage.getItem('token')) {
            navigate(`/checkout/${product._id}`, { state: { product } });
        }
        else {
            navigate('/signin');
        }

    }

    const handleViewItem = (product: ProductDetailsItem) => {
        if (localStorage.getItem('token')) {
            navigate(`/itemDetails/${product._id}`, { state: { product } })
        }
        else {
            navigate('/signin');
        }

    }

    return (
        <div className="md:mx-0 mx-4 md:w-[300px]  min-w-[200px]">
            <div className="flex items-center justify-center">
                <img src={product.images}
                    className="md:w-[300px] sm:w-[200px] w-[250px] md:h-[250px] h-[200px] rounded" alt="No image" />
            </div>
            <h4 className="text-xl font-sans mt-2">{product.name}</h4>
            <p className="text-sm font-thin">{product.description}</p>
            <p className="flex items-center">
                <span><LiaRupeeSignSolid /></span>
                <span className="text-xl font-bold">{product.price}</span>
                <span className="flex items-center mx-2 text-sm text-gray-600">M.R.P:
                    <span className="flex items-center line-through "><LiaRupeeSignSolid />1400</span>
                    <span className="text-black ml-1">(80% off)</span>
                </span>
            </p>
            <p>stock:{product.stock}</p>
            <button onClick={() => { handleViewItem(product) }} className="text-sky-500 underline text-sm my-1 cursor-pointer">View Details</button>
            <div className="flex flex-col my-2">
                <button onClick={() => { handleAddToCart(product._id) }}
                    className="border-[1px]  border-gray-900 bg-yellow-300  my-1  rounded-3xl px-2 py-1 w-full">Add to Cart</button>
                <button onClick={() => { handleBuyItem(product) }} className="border-[1px] text-center border-gray-900 bg-yellow-500  my-1 rounded-3xl px-2 py-1 w-full">Buy Now</button>
            </div>
        </div>
    )
};

export default ProductItem;