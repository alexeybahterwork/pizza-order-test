import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  width: '200px',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const NoMatch = () => {
  return (
    <Grid container style={{ height: 'calc(100% - 64px)' }} direction='row' justifyContent='center' alignItems='center' marginTop={10}>
      <Item>
        <Typography component='h1' variant='h4'>
          No Match 404
        </Typography>
      </Item>
    </Grid>
  );
};
