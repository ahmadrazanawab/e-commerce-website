import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./ProductSlice";
import UserSlice from "./UsersSlice";
import ItemsSlice from "./ItemsSlice";

const store = configureStore({
    reducer: {
        products: productReducer, // Add slice reducer to the store
        users: UserSlice,
        items: ItemsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
