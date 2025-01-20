import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./ProductSlice";
import UserSlice from "./UsersSlice";


const store = configureStore({
  reducer: {
      products: productReducer, // Add slice reducer to the store
      users:UserSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
