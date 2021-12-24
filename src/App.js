import React from 'react';
import { CssBaseline } from '@mui/material';

import { Route, Routes } from 'react-router-dom';

import { Dashboard } from './features/Dashboard/pages/Dashboard/index';
import { Products } from './features/Products/pages/Products';
import { Cart } from './features/Cart/pages/Cart';
import { Checkout } from './features/Checkout/pages/Checkout';
import { NoMatch } from './shared/ui/NoMatch/index';

const App = function () {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Products />} />
          <Route path='cart' element={<Cart />} />
          <Route path='Checkout' element={<Checkout />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
