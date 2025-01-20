import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetailsItem } from "../components/ProductItemDefine";


interface CartItem extends ProductDetailsItem {
    quantity: number;
    TotalAmount: number;
}

interface ProductDetailsItemProps {
    products: ProductDetailsItem[];
    cart: CartItem[];
}
const initialState: ProductDetailsItemProps = {
    products: [],
    cart: [],
};

const prouductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, actions: PayloadAction<ProductDetailsItem[]>) => {
            state.products = actions.payload
        },
        addToCart: (state, action: PayloadAction<string | number>) => {
            const product = state.products.find((p) => p._id === action.payload);
            if (product) {
                const cartItem = state.cart.find((item) => item._id === product._id);
                if (cartItem) {
                    cartItem.quantity += 1; // Increment quantity if already in the cart
                    cartItem.TotalAmount += cartItem.price * cartItem.quantity;
                } else {
                    state.cart.push({ ...product, quantity: 1,TotalAmount:product.price }); // Add to cart with initial quantity 1
                }
            }
        },
        incrementQuantity: (state, action: PayloadAction<string | number>) => {
            const productId = action.payload;
            const cartItem = state.cart.find((item) => item._id === productId);
            if (cartItem) {
                cartItem.quantity += 1; // Increment quantity
            }
            
        },
        decrementQuantity: (state, action: PayloadAction<string | number>) => {
            const cartItem = state.cart.find((item) => item._id === action.payload);
            if (cartItem) {
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1; // Decrement quantity
                } else {
                    state.cart = state.cart.filter((item) => item._id !== action.payload); // Remove from cart if quantity reaches 0
                }
            }
        },
        deleteCart: (state, actions: PayloadAction<string | number>) => {
            state.cart = state.cart.filter((cart) => (cart._id !== actions.payload))
        },
    }
});

export const { setProducts, addToCart,incrementQuantity, decrementQuantity,deleteCart } = prouductSlice.actions;
export default prouductSlice.reducer;