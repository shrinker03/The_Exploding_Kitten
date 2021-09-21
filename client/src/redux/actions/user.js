import { SET_USER, SET_LEADERBOARD } from './types';

export const getSetUser = (username) => async (dispatch) => {
  try {
    const res = await fetch(`/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
      }),
    });
    const data = await res.json();

    dispatch({
      type: SET_USER,
      payload: {
        username,
        savedGame: { ...data.user.savedGame },
        win: data.user.win,
        loose: data.user.loose,
        played: data.user.gamesPlayed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const syncGameToDB = (username, game, cards, defusingCard) => async (
  dispatch
) => {
  try {
    await fetch(`/api/user/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game,
        cards,
        defusingCard,
      }),
    });

    // const data = await res.json();

    // dispatch({
    //   type: SET_USER,
    //   payload: {
    //     username,
    //     savedGame: { ...data.user.savedGame },
    //     win: data.user.win,
    //     loose: data.user.loose,
    //     played: data.user.gamesPlayed,
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
};

export const getLeaderBoard = () => async (dispatch) => {
  try {
    const res = await fetch(`/api/users`);
    const data = await res.json();

    dispatch({
      type: SET_LEADERBOARD,
      payload: {
        users: data.users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
