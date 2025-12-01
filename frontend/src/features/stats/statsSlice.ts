import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/stats';

export const fetchInventoryCurrent = createAsyncThunk('stats/inventoryCurrent', async () => await api.fetchInventoryCurrent());
export const fetchInventoryAsOf = createAsyncThunk('stats/inventoryAsOf', async (date: string) => await api.fetchInventoryAsOf(date));
export const fetchCustomerHistory = createAsyncThunk('stats/customerHistory', async (customerId: number) => await api.fetchCustomerHistory(customerId));

const statsSlice = createSlice({
  name: 'stats',
  initialState: { inventory: [], customerHistory: [], status: 'idle' as 'idle'|'loading'|'succeeded'|'failed' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchInventoryCurrent.fulfilled, (state, action) => { state.inventory = action.payload; });
    builder.addCase(fetchInventoryAsOf.fulfilled, (state, action) => { state.inventory = action.payload; });
    builder.addCase(fetchCustomerHistory.fulfilled, (state, action) => { state.customerHistory = action.payload; });
  },
});

export default statsSlice.reducer;
