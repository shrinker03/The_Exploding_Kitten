import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLeaderBoard } from '../../../redux/actions/user';
import { Box, Button, Divider, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

// Renders LeaderBoard Component
const LeaderBoard = ({ leaderBoard, getLeaderBoard }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (leaderBoard.loading) {
      getLeaderBoard();
    } else {
      setUsers([...leaderBoard.users]);
    }
  }, [leaderBoard, getLeaderBoard]);

  return (
    <Box
      position="relative"
      boxShadow="0 0px 4px 0 rgba(0,0,0,0.12)"
      minHeight="60%"
      pt={2}
      bgcolor="#6f00ff"
      color="#fdf5e6"
    >
      <Typography align="center" paragraph>
        <b>LeaderBoard</b>
      </Typography>

      <Box position="absolute" right={0} top={16} cursor="pointer">
        <Button variant="text" onClick={getLeaderBoard}>
          <Refresh fontSize="small" />
        </Button>
      </Box>

      <Box display="grid" gridGap={5} mt={3}>
        <Box mb={2}>
          <Box px={2} py={1} display="flex" justifyContent="space-between" >
            <Typography>Player</Typography>
            <Typography>Match Won</Typography>
          </Box>
          <Divider />
        </Box>
        {users.map((user) => (
          <Box
            boxShadow="0 1px 3px 0 rgba(0,0,0,0.1)"
            border="0.5px solid"
            key={user._id}
          >
            <Box
              px={2}
              py={1}
              display="flex"
              justifyContent="space-between"
              style={{ textTransform: 'uppercase' }}
            >
              <Typography>{user.username}</Typography>
              <Typography>{user.win}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

LeaderBoard.propTypes = {
  getLeaderBoard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  leaderBoard: state.leaderBoard,
});

export default connect(mapStateToProps, { getLeaderBoard })(LeaderBoard);
