import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';

//Importing the Modal and UserModal Components.
import Modal from '../Modal/Modal';
import UserModal from './UserModal/UserModal';

// Rendering the Landing Page and Modal component to take the Username as Input.
const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      bgcolor="primary.main"
      height="100vh"
      color="#100c08"
      flexWrap="wrap"
      textAlign="center"
      style={{backgroundImage: "url(/images/bg-exploding-kitten.jpg)", backgroundRepeat: "no-repeat",
      backgroundSize: "cover", opacity: "0.8"}}
    >
      <Box width="100%" style={{position: 'absolute', top:'50%'}}>
        <Typography component="h3" variant="h5" gutterBottom>
          Click here to start the Game
        </Typography>
        <Button variant="contained" color="secondary" size="large" onClick={() => setOpen(true)}>
          Let's Start
        </Button>
      </Box>

      <Modal open={open} handleClose={() => setOpen(false)}>
        <UserModal />
      </Modal>
    </Box>
  );
};

export default Home;
