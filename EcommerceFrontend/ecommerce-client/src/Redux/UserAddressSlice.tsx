import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingAddress } from "../components/ProductItemDefine";

interface Product {
    _id: string;
    quantity: number;
}

interface Order {
    _id: string; // Unique ID for the order
    shippingAddress: ShippingAddress[]; // Replace `object` with your address type
    paymentMethod: string;
    products: Product[];
}

interface OrderState {
    orders: Order[];
    user: ShippingAddress[];
}

// const initialState: userShippingAddressProps = {
//     user: [],
// }
const initialState: OrderState = {
    orders: [],
    user: [],
}

const UserAddressSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUserShippingAdress: (state, action: PayloadAction<ShippingAddress>) => {
            state.user.push(action.payload);
            console.log(action.payload);
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
        setShippingAddress: (state, action: PayloadAction<ShippingAddress[]>) => {
            state.user = action.payload
        },
    }
});

export const { addOrder, setShippingAddress, addUserShippingAdress } = UserAddressSlice.actions;
export default UserAddressSlice.reducer;
