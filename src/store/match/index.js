import * as actions from '../api';

const initialState = {
  isSearching: false,
  enemy: {
    id: null,
    name: null,
  },
  options: {
    map: null,
    points: [],
  },
  history: [],
  game: {},
};

export const matchSelector = state => state.match;

export const matchFind = () => async dispatch => {
  dispatch({
    type: 'match/SEARCH_START',
    payload: {},
  });

  const match = await matchFind();

  dispatch({
    type: 'match/SEACRH_SUCCESS',
    payload: match,
  });

  const matchDetails = (await matchFinder.next()).value;

  dispatch({
    type: 'match/DETAILS',
    payload: matchDetails,
  });

  const matchEnvironment = (await matchFinder.next()).value;

  dispatch({
    type: 'match/ENVIRONMENT',
    payload: matchEnvironment,
  });

  const matchActions = (await matchFinder.next()).value;
};

export const attack = () => async dispatch => {
  dispatch({
    type: 'match/ATTACK',
    payload: {},
  });
};

export const cast = () => async dispatch => {
  dispatch({
    type: 'match/CAST',
    payload: {},
  });
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'match/SEARCH_START':
      return {
        ...state,
        isSearching: true,
      };
    case 'match/SEACRH_SUCCESS':
      return {
        ...state,
        isSearching: false,
      };
    case 'match/DETAILS':
      return {};
    case 'match/ENVIRONMENT':
      return {};
    case 'match/ATTACK':
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
    case 'match/CAST':
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
