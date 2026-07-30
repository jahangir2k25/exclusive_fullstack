import { configureStore } from '@reduxjs/toolkit';
import ProductSlices from './Slices/ProductSlices';
import authReducer from './Slices/authSlice';

export const store = configureStore({
  reducer: {
    allProduct: ProductSlices,
    auth: authReducer,
  },
})
