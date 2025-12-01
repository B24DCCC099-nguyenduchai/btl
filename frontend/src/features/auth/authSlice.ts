import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/auth';

export const loginUser = createAsyncThunk('auth/login', async ({ username, password }: any) => {
  const data = await api.login(username, password);
  localStorage.setItem('token', data.token);
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle' as 'idle'|'loading'|'succeeded'|'failed' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => { state.status = 'loading'; })
      .addCase(loginUser.fulfilled, (state, action) => { state.status = 'succeeded'; state.user = action.payload.user; })
      .addCase(loginUser.rejected, state => { state.status = 'failed'; });
  },
});

export default authSlice.reducer;
