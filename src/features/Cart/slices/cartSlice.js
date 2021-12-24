import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../../shared/api/client';

const initialState = {
  items: [],
  status: 'idle',
};

export const addProductToCartAsync = createAsyncThunk('cart/addProductToCart', async (product) => {
  const response = await client.post('/fakeApi/cart/add', { product });
  return response.product;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeCartProductsByIDs(state, action) {
      state.items = state.items.filter((item) => {
        return action.payload.removedIds.indexOf(item.id) === -1;
      });
    },
    removeCartProductByID(state, action) {
      state.items = state.items.filter((item) => {
        return !(item.uuid === action.payload);
      });
    },
    incrementCountProductByID(state, action) {
      state.items = state.items.map((item) => {
        if (item.uuid === action.payload) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    },
    decrementCountProductByID(state, action) {
      state.items = state.items.map((item) => {
        if (item.uuid === action.payload) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCartAsync.pending, (state, action, thunk) => {
        state.status = 'loading';
      })
      .addCase(addProductToCartAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
      });
  },
});

export const { removeCartProductByID, removeCartProductsByIDs, incrementCountProductByID, decrementCountProductByID } =
  cartSlice.actions;

export default cartSlice.reducer;

export const countCartItemsNotification = createSelector(
  (state) => state.cart,
  (cart) => {
    return cart.items.length;
  }
);

export const cartItems = createSelector(
  (state) => state.cart,
  (cart) => {
    return cart.items;
  }
);

export const cartItemsTotalPrice = createSelector(
  (state) => state.cart,
  (cart) => {
    const totalPrice = cart.items.reduce((acc, item) => {
      acc += Number(item.price) * item.count;
      return acc;
    }, 0);

    return totalPrice.toFixed(2);
  }
);
