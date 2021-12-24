import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Button,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  ButtonGroup,
} from '@mui/material';
import { LocalPizza as PizzaIcon, Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

import { useStyles } from './styles';
import { decrementCountProductByID, incrementCountProductByID, removeCartProductByID } from '../../slices/cartSlice';

import { styled } from '@mui/material/styles';
import {pizzaSizes} from "../../../../shared/config";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

const MIN_PRODUCT_COUNT = 1;

export const CartItem = ({ item: { uuid, price, name, size, count } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleReduceItem = () => {
    count === MIN_PRODUCT_COUNT ? dispatch(removeCartProductByID(uuid)) : dispatch(decrementCountProductByID(uuid));
  };

  return (
    <StyledListItem divider={true}>
      <ListItemAvatar>
        <Avatar>
          <PizzaIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={pizzaSizes[size]} />
      <ListItemSecondaryAction>
        <Grid container direction={{ xs: 'column', sm: 'row', md: 'row' }}>
          <ButtonGroup>
            <Button aria-label='reduce' onClick={() => handleReduceItem()}>
              <RemoveIcon edge='end' fontSize='small' />
            </Button>
            <Typography className={classes.count}>{count}</Typography>
            <Button size='small' aria-label='increase' onClick={() => dispatch(incrementCountProductByID(uuid))}>
              <AddIcon fontSize='small' />
            </Button>
          </ButtonGroup>
          <Typography className={classes.price} variant='h6'>
            $ {(price * count).toFixed(2)}
          </Typography>
        </Grid>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
};
