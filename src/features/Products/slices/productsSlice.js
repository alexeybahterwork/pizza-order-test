import { createSlice, createSelector, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { client } from '../../../shared/api/client';

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  status: 'idle',
});

export const getProductsAsync = createAsyncThunk('products/getProducts', async () => {
  const response = await client.get('/fakeApi/products');
  return response.products;
});

export const addProductToCartAsync = createAsyncThunk('products/addProductToCart', async (product) => {
  const response = await client.post('/fakeApi/cart/add', { product });
  return response.product;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadingAddProductByIDToCart(state, action) {
      productsAdapter.updateOne(state, action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.status = 'succeeded';
      });
  },
});

export const { loadingAddProductByIDToCart } = productsSlice.actions;

export default productsSlice.reducer;

export const { selectAll: selectProducts, selectById: selectProductsById } = productsAdapter.getSelectors(
  (state) => state.products
);

export const productsIds = createSelector(selectProducts, (products) => products.map((product) => product.id));
