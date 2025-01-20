import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../components/ProductItemDefine';

interface ProductState {
    products: ProductItem[];
}


const initialState: ProductState = {
    products: [],// Start with an empty array of products
};


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<ProductItem[]>) {
            state.products = action.payload;
          },
        addProduct: (state, action: PayloadAction<ProductItem>) => {
            state.products.push(action.payload); // Add new product to the list
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        }
    }
})

export const {addProduct, deleteProduct,setProducts } = productSlice.actions;
export default productSlice.reducer;


