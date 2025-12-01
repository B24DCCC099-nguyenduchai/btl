import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/customers';

export const fetchCustomers = createAsyncThunk('customers/fetch', async () => await api.getCustomers());

const customerSlice = createSlice({
  name: 'customers',
  initialState: { items: [], status: 'idle' as 'idle'|'loading'|'succeeded'|'failed' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => { state.items = action.payload; state.status = 'succeeded'; });
  },
});

export default customerSlice.reducer;
