import emit, { createEmmiter, getMatchSocket } from '../api';

const MATCH_ENTER = 'match/ENTER';
const MATCH_START = 'match/START';

const MATCH_SEARCH_START = 'match/SEARCH_START';
const MATCH_SEARCH_SUCCESS = 'match/SEARCH_SUCCESS';
const MATCH_FOUND = 'match/FOUND';

const MATCH_ATTACK = 'match/ATTACK';
const MATCH_CAST = 'match/CAST';

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

export const attack = ({ point, value }) => async dispatch => {
  if (!matchEmmiter) {
    throw new Error('matchEmmiter is not defined');
  }

  const attack = matchEmmiter(MATCH_ATTACK, { point, x, y, coords, spell });

  dispatch({
    type: MATCH_ATTACK,
    payload: attack,
  });
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
        enemy: payload.enemy,
        map: payload.map,
        isSearching: false,
      };

    case MATCH_ENTER:
      return {
        ...state,
        details: {
          ...state.match,
          ...payload,
        },
      };

    case MATCH_ATTACK:
      return {
        ...state,
        history: [
          ...sate.history,
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
          ...sate.history,
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
