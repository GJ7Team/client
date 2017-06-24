import emit, { createEmmiter, getMatchSocket } from '../api';

const MATCH_ENTER = 'match/ENTER';
const MATCH_START = 'match/START';

const MATCH_SEARCH_START = 'match/SEARCH_START';
const MATCH_SEARCH_SUCCESS = 'match/SEARCH_SUCCESS';
const MATCH_FOUND = 'match/FOUND';

const MATCH_ATTACK = 'match/ATTACK';
const MATCH_ENEMY_ATTACK = 'match/ENEMY_ATTACK';
const MATCH_CAST = 'match/CAST';
const MATCH_TICK = 'match/TICK';
const MATCH_LOST = 'match/LOST';
const MATCH_WIN = 'match/WIN';

const initialState = {
  isSearching: false,
  enemy: null,
  map: null,
  details: null,
  history: [],
  game: {},
};

let matchEmmiter = null;
let matchSocket = null;

export const matchSelector = state => state.match;

export const matchFind = () => async dispatch => {
  dispatch({
    type: MATCH_SEARCH_START,
    payload: {},
  });

  const match = await emit(MATCH_SEARCH_START);

  console.log(match);
  dispatch({
    type: MATCH_SEARCH_SUCCESS,
    payload: match,
  });

  console.log('connect to room ' + match.matchId);
  matchSocket = getMatchSocket(match.matchId);
  matchEmmiter = createEmmiter(matchSocket);

  const matchDetails = await matchEmmiter(MATCH_ENTER);

  dispatch({
    type: MATCH_ENTER,
    payload: matchDetails,
  });

  // const matchActions = (await matchFinder.next()).value;
};

// export const attack = ({ point, value }) => async dispatch => {
export const attack = ({
  fromColonyId,
  toColonyId,
  attackPower,
}) => async dispatch => {
  if (!matchEmmiter) {
    throw new Error('matchEmmiter is not defined');
  }

  // const attack = matchEmmiter(MATCH_ATTACK, { point, x, y, coords, spell });
  const attack = matchEmmiter(MATCH_ATTACK, {
    fromColonyId,
    toColonyId,
    attackPower,
  });

  dispatch({
    type: MATCH_ATTACK,
    payload: attack,
  });
};

export const subscribeAttack = res => dispatch => {
  if (!matchEmmiter) {
    throw new Error('matchEmmiter is not defined');
  }

  matchSocket.on(MATCH_ATTACK, data => {
    dispatch({
      type: MATCH_ENEMY_ATTACK,
      payload: data,
    });

    res(data);
  });
};

export const subscribeMatchDisconnect = res => dispatch => {
  if (!matchEmmiter) {
    throw new Error('matchEmmiter is not defined');
  }

  matchSocket.on('disconnect', res);
};

export const subscribeMatchTick = res => dispatch => {
  if (!matchEmmiter) {
    throw new Error('matchEmmiter is not defined');
  }

  matchSocket.on(MATCH_TICK, res);
};

export const cast = ({ point, x, y, coords, spell }) => async dispatch => {
  if (!matchEmmiter) {
    throw new Error('matchEmmiter is not defined');
  }

  const cast = matchEmmiter(MATCH_CAST, { point, x, y, coords, spell });

  dispatch({
    type: MATCH_CAST,
    payload: cast,
  });
};

export const win = () => async dispatch => {
  if (!matchEmmiter) {
    throw new Error('matchEmmiter is not defined');
  }

  matchEmmiter(MATCH_WIN);

  dispatch({
    type: MATCH_WIN,
    payload: {},
  });
};

export const lost = () => async dispatch => {
  if (!matchEmmiter) {
    throw new Error('matchEmmiter is not defined');
  }

  matchEmmiter(MATCH_LOST);

  dispatch({
    type: MATCH_LOST,
    payload: {},
  });
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case MATCH_SEARCH_START:
      return {
        ...state,
        isSearching: true,
      };

    case MATCH_SEARCH_SUCCESS:
      return {
        ...state,
        leftId: payload.leftId,
        rightId: payload.rightId,
        enemy: payload.enemy,
        map: payload.map,
        isSearching: false,
      };

    case MATCH_ENTER:
      return {
        ...state,
        map: {
          ...payload.map,
        },
      };

    case MATCH_ENEMY_ATTACK:
      return {
        ...state,
        history: [
          ...state.history,
          {
            type: 'enemy-attack',
            value: payload,
          },
        ],
      };
    case MATCH_ATTACK:
      return {
        ...state,
        history: [
          ...state.history,
          {
            type: 'attack',
            value: payload,
          },
        ],
      };
    case MATCH_CAST:
      return {
        ...state,
        history: [
          ...state.history,
          {
            type: 'cast',
            value: payload,
          },
        ],
      };
    default:
      return state;
  }
};
