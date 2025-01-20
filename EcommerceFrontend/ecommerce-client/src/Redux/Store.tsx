import { configureStore } from "@reduxjs/toolkit";
import prouductSlice from "./ProductSlice";

const store = configureStore({
    reducer: {
        products: prouductSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };