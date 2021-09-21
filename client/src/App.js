import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

// Importing Home and Game Components.
import Home from './components/Home/Home';
import Game from './components/Game/Game';

import './App.css';

// Checking if the username is in the game prop and then Rendering the Game or Home Component based on it.
const App = ({ game }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(game?.username);
  }, [game]);

  return <Box>{userName ? <Game /> : <Home />}</Box>;
};

// Grabbing Game prop from the state
const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps)(App);
