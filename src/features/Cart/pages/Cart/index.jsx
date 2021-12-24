import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Typography, List, Button } from '@mui/material';
import { cartItems, cartItemsTotalPrice } from '../../slices/cartSlice';
import { CartItem } from '../../components/CartItem';
import TitlePage from '../../../../shared/ui/TitlePage';
import { useStyles } from './styles';

export const Cart = () => {
  const classes = useStyles();

  const items = useSelector(cartItems);
  const totalPrice = useSelector(cartItemsTotalPrice);

  return (
    <>
      <Grid className={classes.container} item alignContent='left' md={12} xs={12}>
        <Grid item>
          <TitlePage component='h1' variant='h4' align='left'>
            Your Cart
          </TitlePage>
        </Grid>
        <Grid item justifyContent='center'>
          <List>
            {items.map((item, index) => (
              <CartItem key={index} index={index} item={item} />
            ))}
            {items && !items.length && (
              <Grid container item flexDirection='column' justifyContent='center'>
                <Typography padding={10} component='h4' variant='h6' align='center'>
                  No products.
                </Typography>
                <Link className={classes.backBtn} to='/'>
                  <Button className={classes.noItemsBtn} variant='outlined'>
                    Back to Products
                  </Button>
                </Link>
              </Grid>
            )}
          </List>
        </Grid>
        {items.length > 0 && (
          <Grid container flexDirection='column' alignContent='end'>
            <Typography component='h6' variant='h6' align='right' paddingBottom={1}>
              Total: $ {totalPrice}
            </Typography>
            <Link className={classes.link} to='/checkout'>
              <Button className={classes.nextBtn} variant='contained'>
                Place Order
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </>
  );
};
