import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = ({ style, ...props }) => {
  return (
    <Box sx={{ display: 'flex', ...style }}>
      <CircularProgress {...props} />
    </Box>
  );
};

export default Spinner;
