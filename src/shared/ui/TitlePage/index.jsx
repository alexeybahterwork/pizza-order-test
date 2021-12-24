import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

const TitlePage = ({ children: text, ...props }) => {
  return <StyledTypography {...props}>{text}</StyledTypography>;
};

export default TitlePage;
