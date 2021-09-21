import { SET_LEADERBOARD } from '../actions/types';

const initialState = { users: [], loading: true };

export default function alert(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LEADERBOARD:
      return { ...state, users: [...payload.users], loading: false };

    default:
      return state;
  }
}
