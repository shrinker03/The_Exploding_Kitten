import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

import Header from './Header/Header';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import Card from './Card/Card';

import './Card/style.css';

import useStyles from './useStyles';

import { syncGameToDB } from '../../redux/actions/user';

const Game = ({ game, syncGameToDB }) => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [defusingCard, setDefusingCard] = useState(0);

  const [gameStatus, setGameStatus] = useState({
    played: 0,
    win: 0,
    loose: 0,
    status: 'loading',
  });

  const { played, win, loose, status } = gameStatus;

  const startGame = (game) => {
    let getCards = [];
    let defusing = 0;

    if (game?.savedGame && game?.savedGame?.cards?.length > 0) {
      getCards = [...game?.savedGame.cards];
      defusing = game?.savedGame.defusingCard;
    } else {
      const gameCards = ['cat', 'bomb', 'defusing', 'shuffle'];

      for (let i = 0; i < 5; i++) {
        const index = Math.round(Math.random() * 3);

        getCards.push(gameCards[index]);
      }

      setGameStatus((oldGameStatus) => ({
        ...oldGameStatus,
        status: 'running',
      }));
    }

    setGameStatus((oldGameStatus) => ({
      ...oldGameStatus,
      played: game?.played || oldGameStatus?.played,
      win: game?.win || oldGameStatus?.win,
      loose: game?.loose || oldGameStatus?.loose,
      status: 'running',
    }));

    setCards([...getCards]);
    setDefusingCard(defusing);
  };

  useEffect(() => {
    if (game?.username) startGame(game);
  }, [game]);

  const drawCardHandler = (id) => {
    const el = document.querySelector(`#${id}`);

    console.log(el);

    el.classList.add('card--flipped');

    setTimeout(() => {
      runGameLogic();
    }, 1000);
  };

  const runGameLogic = () => {
    let leftCards = cards;
    let lastCard = leftCards.pop();

    const stats = {
      defusingCard,
      played,
      win,
      loose,
      status,
    };

    if (lastCard === 'shuffle') {
      stats.status = 'restarting';
      stats.defusingCard = 0;

      setTimeout(() => {
        startGame();
      }, 1000);
    } else if (lastCard === 'defusing') {
      stats.defusingCard++;
    } else if (lastCard === 'bomb') {
      if (defusingCard > 0) {
        stats.defusingCard--;

        lastCard = 'defusing';
      } else {
        stats.played++;
        stats.loose++;
        stats.status = 'loose';
        stats.defusingCard = 0;
      }
    }

    if (leftCards.length === 0 && lastCard !== 'bomb') {
      stats.defusingCard = 0;
      stats.played++;
      stats.win++;
      stats.status = 'win';
    }

    setGameValues(
      leftCards,
      stats.defusingCard,
      stats.played,
      stats.win,
      stats.loose,
      stats.status
    );
  };

  const setGameValues = (gCards, gDefusing, gPlayed, gWin, gLoose, gStatus) => {
    setCards([...gCards]);
    setDefusingCard(gDefusing);
    setGameStatus((oldGameStatus) => ({
      ...oldGameStatus,
      played: gPlayed,
      win: gWin,
      loose: gLoose,
      status: gStatus,
    }));
    syncGameToDB(
      game?.username,
      {
        played: gPlayed,
        win: gWin,
        loose: gLoose,
      },
      gStatus === 'running' ? gCards : [],
      gDefusing
    );
  };

  return (
    <Box position="relative">
      <Header username={game.username} />

      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} mb={6}>
            <Box boxShadow="0 0px 4px 0 rgba(0,0,0,0.12)" mb={4} pt={2} bgcolor="#8a2be2" color="#fdf5e6">
              <Typography paragraph align="center">
                <b>Game Stats</b>
              </Typography>
              <Box>
                <Box
                  px={4}
                  py={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>{`Played : `}</Typography>
                  <Typography>{gameStatus.played}</Typography>
                </Box>

                <Divider />

                <Box
                  px={4}
                  py={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>{`Win : `}</Typography>
                  <Typography>{gameStatus.win}</Typography>
                </Box>

                <Divider />

                <Box
                  px={4}
                  py={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>{`Loose : `}</Typography>
                  <Typography>{gameStatus.loose}</Typography>
                </Box>
              </Box>
            </Box>
            <LeaderBoard/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              position="relative"
              width="100%"
              minHeight="70vh"
              boxShadow="0 0px 4px 0 rgba(0,0,0,0.12)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#fdde6c"
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                {gameStatus.status === 'running' && (
                  <Box position="relative" width={285} height={290}>
                    {cards.map((card, key) => (
                      <Box
                        className={classes.root}
                        zIndex={key}
                        key={key + card}
                        onClick={() => drawCardHandler(card + key)}
                      >
                        <Card id={card + key} card={card} />
                      </Box>
                    ))}
                  </Box>
                )}

                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={1}
                  color="#fff"
                  bgcolor="#3EB489"
                >
                  {gameStatus.status === 'loose' ||
                  gameStatus.status === 'win' ? (
                    <Typography>
                      You {status === 'win' ? 'win 🎉🎉🎉' : 'loose 😥😥😥'}
                    </Typography>
                  ) : (
                    <Typography>Cards left: {cards.length}</Typography>
                  )}
                </Box>

                {gameStatus.status === 'restarting' && (
                  <Typography>Shuffling ...</Typography>
                )}

                {(gameStatus.status === 'loose' ||
                  gameStatus.status === 'win') && (
                  <Box>
                    <Button onClick={() => startGame()} variant="contained">
                      Click Here to play Again
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Game.propTypes = {
  syncGameToDB: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { syncGameToDB })(Game);
