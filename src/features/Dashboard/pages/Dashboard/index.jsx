import React from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '../../components/Navbar';
import Container from '@mui/material/Container';
import { Link, Outlet } from 'react-router-dom';
import { useStyles } from './styles';
import {AppBar, Button, CssBaseline, IconButton, Toolbar, Badge, Grid} from '@mui/material';
import { LocalPizza as PizzaIcon, Logout as LogoutIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { countCartItemsNotification } from '../../../Cart/slices/cartSlice';
import Copyright from "../../components/Copyright";

export const Dashboard = () => {
  const classes = useStyles();
  const countCartItemsNotificationNumber = useSelector(countCartItemsNotification);

  // <Navbar /> isn't displayed because <Outlet /> doesn't see nested components
  return (
    <>
      <CssBaseline />
      <AppBar color='default'>
        <Toolbar className={classes.containerNavbar}>
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

      <Grid flexDirection='column' justifyContent='space-between' className={classes.main}>
        <Container className={classes.container} maxWidth='lg'>
          <Outlet />
        </Container>

        <Copyright />
      </Grid>
    </>
  );
};
