import * as actions from '../api';

const initialState = {
  player: {
    id: null,
    name: null,
  },
  world: {
    players: 0,
  },
};

export const gameSelector = state => state.game;

export const gameEnter = ({ name }) => async dispatch => {
  const game = await actions.gameEnter({
    name: !name.trim() ? 'anon-pidor' : name,
  });

  dispatch({
    type: 'game/ENTER',
    payload: game,
  });
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'game/ENTER':
      return {
        player: {
          id: payload.id,
          name: payload.name,
        },
        world: {
          players: payload.players,
        },
      };
    default:
      return state;
  }
};
