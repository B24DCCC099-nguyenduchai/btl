import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/orders';

export const fetchOrders = createAsyncThunk('orders/fetch', async () => await api.getOrders());

const orderSlice = createSlice({
  name: 'orders',
  initialState: { items: [], status: 'idle' as 'idle'|'loading'|'succeeded'|'failed' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => { state.items = action.payload; state.status = 'succeeded'; });
  },
});

export default orderSlice.reducer;
