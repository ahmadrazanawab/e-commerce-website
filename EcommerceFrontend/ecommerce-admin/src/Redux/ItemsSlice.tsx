import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../components/ProductItemDefine";

interface ProductState {
    item: ProductItem;
    isEditItem: boolean;
}

const initialState: ProductState = {
    item: {
        _id: '',
        name: '',
        description: '',
        images: '',
        price: 0,
        stock: 0,
        mrpPrice: 0,
        disPercentage: 0,
        category: '',
    },
    isEditItem: false,
};

const ItemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setProductItem: (state, action: PayloadAction<ProductItem>) => {
            state.item = action.payload;
        },
        setIsEditItem: (state, action: PayloadAction<boolean>) => {
            state.isEditItem = action.payload;
        },
    },
});

export const { setProductItem, setIsEditItem } = ItemsSlice.actions;
export default ItemsSlice.reducer;
