import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingAddress } from "../components/ProductItemDefine";

interface userShippingAddressProps {
    user: ShippingAddress[]
};

const initialState: userShippingAddressProps = {
    user: [],
}

const UserAddressSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setShippingAddress: (state,action:PayloadAction<ShippingAddress[]>) => {
            state.user = action.payload 
        },
        addUserShippingAdress: (state,action:PayloadAction<ShippingAddress>) => {
            state.user.push(action.payload);
            console.log(action.payload);
        }
    }
});

export const {setShippingAddress,addUserShippingAdress} = UserAddressSlice.actions;
export default UserAddressSlice.reducer;
