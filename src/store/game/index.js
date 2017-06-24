import emit from '../api';

const GAME_ENTER = 'game/ENTER';
const GAME_PLAYERS_ONLINE_CHANGE = 'game/GAME_PLAYERS_ONLINE_CHANGE';

const initialState = {
  player: {
    id: null,
    name: null,
  },
  world: {
    players: 0,
  },
  playersOnline: [],
};

export const gameSelector = state => state.game;
export const onlinePlayersSelector = state => state.game.playersOnline;

export const gameEnter = ({ name }) => async dispatch => {
  const game = await emit(GAME_ENTER, {
    name: !name.trim() ? 'Anonymouse' : name,
  });

  dispatch({
    type: GAME_ENTER,
    payload: game,
  });
};

export const playersOnlineChange = players => ({
  type: GAME_PLAYERS_ONLINE_CHANGE,
  payload: players,
});

export const myNameSelector = state => state.game.player.name;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GAME_ENTER:
      return {
        player: {
          id: payload.id,
          name: payload.name,
        },
        stats: payload.stats,
        world: {
          players: payload.players,
        },
        playersOnline: payload.playersOnline || [],
      };
    case GAME_PLAYERS_ONLINE_CHANGE:
      return {
        ...state,
        playersOnline: payload,
      };
    default:
      return state;
  }
};
