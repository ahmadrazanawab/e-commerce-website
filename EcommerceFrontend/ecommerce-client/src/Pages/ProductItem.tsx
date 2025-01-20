import { useDispatch, useSelector } from "react-redux";
import { ProductDetailsItem } from "../components/ProductItemDefine";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RootState } from "../Redux/Store";
import { addToCart,incrementQuantity, decrementQuantity } from "../Redux/ProductSlice";

interface ProductProps {
    product: ProductDetailsItem;
}

const ProductItem: React.FC<ProductProps> = (props) => {
    const { product } = props;
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.products.cart);
    const cartItem = cart.find((item) => item._id === product._id);
    const totalCartQuantity = cartItem?.quantity || 1;
    const totalPrice = totalCartQuantity * (cartItem?.price || product.price);
   
    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product))
        alert("Product has been added to cart successfuly");
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
            <div className="flex items-center"> <label htmlFor="qty">Qty:</label>
                <button onClick={() => { dispatch(decrementQuantity(product._id)) }}
                    
                    className="px-2 border-[1px] border-gray-900 outline-none mx-2 rounded bg-gray-400 text-white font-bold"
                >
                    -
                </button>
                <h4 className="text-red-500 text-xl">{totalCartQuantity}</h4>
                <button
                    onClick={() => dispatch(incrementQuantity(product._id))}
                    className="px-2 border-[1px] outline-none border-gray-900 mx-2 rounded bg-gray-400 text-white font-bold"
                >
                    +
                </button>
            </div>
            <div>
                <h4 className="mx-2 my-1 font-semibold">{ totalPrice}</h4>
            </div>
            <p className="text-sky-500 underline text-sm my-1 cursor-pointer">View Details</p>
            <div className="flex flex-col my-2">
                <button onClick={() => { handleAddToCart(product._id)}}
                    className="border-[1px]  border-gray-900 bg-yellow-300  my-1  rounded-3xl px-2 py-1 w-full">Add to Cart</button>
                <button className="border-[1px] border-gray-900 bg-yellow-300  my-1 rounded-3xl px-2 py-1 w-full">Buy Now</button>
            </div>
        </div>
    )
};

export default ProductItem;