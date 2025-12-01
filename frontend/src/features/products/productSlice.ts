import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/products';

export const fetchProducts = createAsyncThunk('products/fetch', async () => await api.getProducts());

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle' as 'idle'|'loading'|'succeeded'|'failed' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => { state.items = action.payload; state.status = 'succeeded'; });
  },
});

export default productSlice.reducer;
