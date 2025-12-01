import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/receipts';

export const fetchReceipts = createAsyncThunk('receipts/fetch', async () => await api.getReceipts());

const receiptSlice = createSlice({
  name: 'receipts',
  initialState: { items: [], status: 'idle' as 'idle'|'loading'|'succeeded'|'failed' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReceipts.fulfilled, (state, action) => { state.items = action.payload; state.status = 'succeeded'; });
  },
});

export default receiptSlice.reducer;
