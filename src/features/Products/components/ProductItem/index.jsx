import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardMedia, CardActions, CardContent, Typography, Paper, ToggleButton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { LoadingButton } from '../../../../shared/ui/LoadingButton';
import { useStyles } from './styles';
import { selectProductsById, loadingAddProductByIDToCart } from '../../slices/productsSlice';
import { addProductToCartAsync } from '../../../Cart/slices/cartSlice';
import { ToggleButtonGroup } from '../../../../shared/ui/ToggleButtonGroup';

export const ProductItem = ({ id }) => {
  const product = useSelector((state) => selectProductsById(state, id));
  const { name, description, image, sizes, prices, meta } = product;

  const [size, setSize] = useState(sizes[0]);
  const [price, setPrice] = useState(prices[0]);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleChangeSize = (event, newSize) => {
    if (newSize !== null) {
      const sizeIndex = sizes.indexOf(newSize);

      setSize(newSize);
      setPrice(prices[sizeIndex]);
    }
  };

  const handleAddToBasket = (id) => {
    const product = { uuid: uuidv4(), id, name, size, price, count: 1 };

    dispatch(loadingAddProductByIDToCart({ id, changes: { meta: { status: 'loading' } } }));

    dispatch(addProductToCartAsync(product)).then(() => {
      dispatch(loadingAddProductByIDToCart({ id, changes: { meta: { status: 'succeeded' } } }));
    });
  };

  return (
    <Grid item xs={11} sm={6} md={4} lg={4} xl={4}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.img}
          component='img'
          alt={name}
          height='240'
          image={`${process.env.PUBLIC_URL}/assets/images/${image}`}
          title='pizza'
        />
        <CardContent>
          <Typography variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography className={classes.descriptionProduct} variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: 'wrap',
            }}
          >
            <ToggleButtonGroup
              size='small'
              value={size}
              exclusive
              onChange={handleChangeSize}
              aria-label='text alignment'
            >
              {sizes.map((size, index) => (
                <ToggleButton key={index} value={size} aria-label={index}>
                  {size}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Paper>
          <LoadingButton
            id={String(id)}
            className={classes.button}
            loading={meta.status === 'loading'}
            loadingIndicator='Adding...'
            variant='contained'
            size='large'
            onClick={() => handleAddToBasket(id)}
          >
            from ${price}
          </LoadingButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
