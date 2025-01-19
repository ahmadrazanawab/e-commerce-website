import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./ProductSlice";


const store = configureStore({
  reducer: {
    products: productReducer, // Add slice reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
