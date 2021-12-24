import React from 'react';
import { Grid, Typography, Button, Container, Paper, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';

import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrderAsync } from '../../slices/checkoutSlice';
import {
  cartItems as cartItemsSelector,
  cartItemsTotalPrice,
  removeCartProductsByIDs,
} from '../../../Cart/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import TitlePage from '../../../../shared/ui/TitlePage';

const initialAddress = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
};

const validateAddress = (fields) => {
  const errors = {};

  if (!fields.firstName) {
    errors.firstName = 'Required';
  }
  if (!fields.lastName) {
    errors.lastName = 'Required';
  }
  if (!fields.address1) {
    errors.address1 = 'Required';
  }

  return errors;
};

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const totalPrice = useSelector(cartItemsTotalPrice);
  const classes = useStyles();

  const buyProduct = (fields) => {
    if (cartItems.length === 0) {
      navigate('/');
      return;
    }

    dispatch(placeOrderAsync({ cartItems, address: fields })).then((response) => {
      const removedCartItemIds = response.payload.cartItems.map((item) => item.id);

      dispatch(removeCartProductsByIDs({ removedIds: removedCartItemIds }));

      navigate('/', {
        state: { purchaseInformation: { cartItems: response.payload.cartItems, recipientAddress: fields, totalPrice } },
      });
    });
  };

  return (
    <>
      <Grid>
        <TitlePage component='h1' variant='h4' align='left'>
          Checkout
        </TitlePage>
        <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
          <Paper variant='outlined' sx={{ p: { xs: 2, md: 2 } }}>
            <Typography variant='h6' gutterBottom>
              Shipping address
            </Typography>
            <Formik initialValues={initialAddress} validate={validateAddress} onSubmit={buyProduct}>
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        required
                        component={TextField}
                        type='text'
                        name='firstName'
                        label='First name'
                        fullWidth
                        autoComplete='given-name'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        required
                        component={TextField}
                        type='text'
                        id='lastName'
                        name='lastName'
                        label='Last name'
                        fullWidth
                        autoComplete='family-name'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        required
                        component={TextField}
                        type='text'
                        id='address1'
                        name='address1'
                        label='Address line 1'
                        fullWidth
                        autoComplete='shipping address-line1'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        id='address2'
                        component={TextField}
                        type='text'
                        name='address2'
                        label='Address line 2'
                        fullWidth
                        autoComplete='shipping address-line2'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        required
                        component={TextField}
                        type='text'
                        id='city'
                        name='city'
                        label='City'
                        fullWidth
                        autoComplete='shipping address-level2'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        component={TextField}
                        type='text'
                        id='state'
                        name='state'
                        label='State/Province/Region'
                        fullWidth
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        required
                        component={TextField}
                        type='text'
                        id='zip'
                        name='zip'
                        label='Zip / Postal code'
                        fullWidth
                        autoComplete='shipping postal-code'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        required
                        component={TextField}
                        type='text'
                        id='country'
                        name='country'
                        label='Country'
                        fullWidth
                        autoComplete='shipping country'
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant='variant' sx={{ mt: 3, ml: 1 }}>
                      <Link className={classes.link} to='/cart'>
                        Back
                      </Link>
                    </Button>

                    <Button variant='contained' sx={{ mt: 3, ml: 1 }} disabled={isSubmitting} onClick={submitForm}>
                      Buy
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Container>
      </Grid>
    </>
  );
};
