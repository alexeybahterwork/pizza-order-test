import React from 'react';
import { styled } from '@mui/material/styles';
import { ToggleButtonGroup as ToggleButtonGroupMUI } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroupMUI)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export const ToggleButtonGroup = ({ children: text, ...props }) => {
  return <StyledToggleButtonGroup {...props}>{text}</StyledToggleButtonGroup>;
};
