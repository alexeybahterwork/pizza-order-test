import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Badge, CssBaseline, IconButton, Toolbar } from '@mui/material';
import { LocalPizza as PizzaIcon, Logout as LogoutIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { countCartItemsNotification } from '../../../Cart/slices/cartSlice';

export var Navbar = function () {
  const classes = useStyles();
  const countCartItemsNotificationNumber = useSelector(countCartItemsNotification);

  return (
    <>
      <CssBaseline />
      <AppBar color='default'>
        <Toolbar className={classes.container}>
          <Link to='/'>
            <IconButton size='large'>
              <PizzaIcon />
            </IconButton>
          </Link>
          <div className={classes.rightMenu}>
            <Link to='/cart'>
              <IconButton style={{ marginRight: '10px' }}>
                <Badge badgeContent={countCartItemsNotificationNumber} color='primary'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
