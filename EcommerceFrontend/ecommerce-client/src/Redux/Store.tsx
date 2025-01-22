import { configureStore } from "@reduxjs/toolkit";
import prouductSlice from "./ProductSlice";
import UserAddressSlice from "./UserAddressSlice";

const store = configureStore({
    reducer: {
        products: prouductSlice,
        user:UserAddressSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };