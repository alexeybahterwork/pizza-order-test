import React from 'react';
import {
  Backdrop,
  Box,
  Modal as ModalMUI,
  Fade,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { createPortal } from 'react-dom';
import {pizzaSizes} from "../../config";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '340px',
  maxWidth: '620px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Modal = ({ isShowing, hide, content: { cartItems, recipientAddress, totalPrice } = {} }) => {
  return isShowing
    ? createPortal(
        <ModalMUI
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={isShowing}
          onClose={hide}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isShowing}>
            <Box sx={style}>
              <Typography variant='h6' gutterBottom>
                Order summary
              </Typography>
              <List>
                {cartItems.map((cartItem) => (
                  <ListItem key={cartItem.uuid} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={cartItem.name} secondary={pizzaSizes[cartItem.size]} />
                    <Typography variant="body2" sx={{ mr: 2 }}>X {cartItem.count}</Typography>
                    <Typography variant="body1">$ {cartItem.price}</Typography>
                  </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText  primary="Total" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    $ {totalPrice}
                  </Typography>
                </ListItem>
              </List>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                    Shipping
                  </Typography>
                  <Typography gutterBottom>{recipientAddress.firstName} {recipientAddress.lastName}</Typography>
                  <Typography gutterBottom>{recipientAddress.zip}, {recipientAddress.state}, {recipientAddress.city}, {recipientAddress.address1}</Typography>
                </Grid>
                <Grid item container direction='column' xs={12} sm={6}>
                  <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                    Payment details
                  </Typography>
                  <Grid container>
                    <Grid item>
                      <Typography gutterBottom>Payment in cash</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={hide}>
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>
        </ModalMUI>,
        document.body
      )
    : null;
};
