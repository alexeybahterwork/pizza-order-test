import React from 'react';
import {Typography, Link} from "@mui/material";

const Copyright = () => {
  return (
    <Typography sx={{ mt: 2 }} variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" sx={{ mr: 1 }} href="https://github.com/alexeybahterwork">
        My Github
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright
