import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../shared/api/client';

const initialState = {
  orders: [],
  address: {},
  status: 'idle',
};

export const placeOrderAsync = createAsyncThunk('checkout/placeOrder', async (order) => {
  const response = await client.post('/fakeApi/order/add', { order });
  return response.order;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.status = 'succeeded';
      });
  },
});

export default orderSlice.reducer;
