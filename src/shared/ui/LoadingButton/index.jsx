import React from 'react';
import { LoadingButton as LoadingButtonMUI } from '@mui/lab';
import { styled } from '@mui/material/styles';

const StyledLoadingButton = styled(LoadingButtonMUI)(({ theme }) => ({
  paddingLeft: theme.spacing(0.8),
  paddingRight: theme.spacing(0.8),
}));

export const LoadingButton = ({ children: text, ...props }) => {
  return <StyledLoadingButton {...props}>{text}</StyledLoadingButton>;
};
