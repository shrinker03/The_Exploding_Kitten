import React from 'react';
import { Box, Typography } from '@material-ui/core';

// Renders Navbar
const Header = ({ username }) => {
  return (
    <Box
      boxShadow="0 1px 5px 1px rgba(0,0,0,0.25)"
      mb={4}
      px={{ xs: 2, md: 5 }}
      py={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="	#3EB489"
      color="#fdf5e6"
    >
      <Typography component="h1" variant="h5" >
      <p style={{display: 'flex', justifyContent: 'center'}}>
        <img alt="cat" src="/images/cat-header.png" /> <span style={{marginLeft: '5px'}}>Exploding Kitten Game</span>
      </p> 
      </Typography>

      <Typography component="div">
        Player Name: <b>{username}</b>
      </Typography>
    </Box>
  );
};

export default Header;
