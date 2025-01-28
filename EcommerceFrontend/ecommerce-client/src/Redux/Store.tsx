import { configureStore } from "@reduxjs/toolkit";
import prouductSlice from "./ProductSlice";
import UserAddressSlice from "./UserAddressSlice";
import userAuthSlice from "./UserAuth";

const store = configureStore({
    reducer: {
        products: prouductSlice,
        user: UserAddressSlice,
        userAuth: userAuthSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };