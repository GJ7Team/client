import emit from '../api';

const GAME_ENTER = 'game/ENTER';

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
  const game = await emit(GAME_ENTER, {
    name: !name.trim() ? 'anon-pidor' : name,
  });

  dispatch({
    type: GAME_ENTER,
    payload: game,
  });
};

export const myNameSelector = (state) => state.game.player.name;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GAME_ENTER:
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
