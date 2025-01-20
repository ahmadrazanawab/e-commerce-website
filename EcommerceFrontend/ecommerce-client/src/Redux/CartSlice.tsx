import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cartProps {
    _id: string | number;
    quantity: number;
    totalQuantity: number;
    totalPrice: number;
    price: number;
}
interface cartState {
    items: cartProps[],
}
const initialState:cartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, actions: PayloadAction<string | number>) {
      const existingItem = state.items.find((item) => item._id === actions.payload);
      if (existingItem) {
        existingItem.quantity += 1;
          existingItem.price += 1;
      } else {
        // state.items.push({ ...actions.payload, quantity: 1, totalPrice: actions.payload.price });
      }
    //   state.totalQuantity += 1;
    //   state.totalPrice += action.payload.price;
    },
    removeFromCart(state, actions: PayloadAction) {
    //   const existingItem = state.items.find(item => item.id === action.payload.id);
    //   if (existingItem) {
    //     state.totalQuantity -= existingItem.quantity;
    //     state.totalPrice -= existingItem.totalPrice;
    //     state.items = state.items.filter(item => item.id !== action.payload.id);
    //   }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
