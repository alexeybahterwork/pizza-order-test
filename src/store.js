import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './features/Products/slices/productsSlice';
import cartReducer from './features/Cart/slices/cartSlice';
import checkoutReducer from './features/Checkout/slices/checkoutSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    order: checkoutReducer,
  },
});

export default store;
