import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import customerReducer from '../features/customers/customerSlice';
import orderReducer from '../features/orders/orderSlice';
import receiptReducer from '../features/receipts/receiptSlice';
import statsReducer from '../features/stats/statsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    customers: customerReducer,
    orders: orderReducer,
    receipts: receiptReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
