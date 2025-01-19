import { ProductDetailsItem } from "../components/ProductItemDefine";
import { LiaRupeeSignSolid } from "react-icons/lia";
interface ProductProps {
    product: ProductDetailsItem;
}

const ProductItem: React.FC<ProductProps> = (props) => {
    const { product } = props;
    return (
        <div className="mx-2 max-w-[300px]">
            <div className="flex items-center justify-center">
                <img src={product.images}
                    className="sm:w-[300px] w-[250px] sm:h-[250px] h-[200px] rounded" alt="No image" />
            </div>
            <h4 className="text-xl font-sans mt-2">{product.name}</h4>
            <p className="text-sm font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus perferendis quaerat similique? {product.description}</p>
            <p className="flex items-center">
                <span><LiaRupeeSignSolid /></span>
                <span className="text-xl font-bold">{product.price}</span>
                <span className="flex items-center mx-2 text-sm text-gray-600">M.R.P:
                    <span className="flex items-center line-through "><LiaRupeeSignSolid />1400</span>
                    <span className="text-black ml-1">(80% off)</span>
                </span>
            </p>
            <p>stock:{product.stock}</p>
            <p className=""> <label htmlFor="qty">Qty:</label> 
                <input type="number" defaultValue={1} id="qty" className="mx-1 px-2 my-1 border-[1px] border-gray-900 rounded "/>
            </p>
            <p className="text-sky-500 underline text-sm my-1 cursor-pointer">View Details</p>
            <div className="flex flex-col my-2">
                <button className="border-[1px]  border-gray-900 bg-yellow-300  my-1  rounded px-2 py-1 w-full">Add to Cart</button>
                <button className="border-[1px] border-gray-900 bg-yellow-300  my-1 rounded px-2 py-1 w-full">Buy Now</button>
            </div>
        </div>
    )
};

export default ProductItem;