import { compose, createStore, combineReducers, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import gameReducer, { gameSelector, gameEnter } from './game';
import matchReducer, { matchSelector, matchFind, attack, cast } from './match';

const rootReducer = combineReducers({
  game: gameReducer,
  match: matchReducer,
});

const middlewares = [thunkMiddleware, loggerMiddleware];

let storeCreator = applyMiddleware.apply(null, middlewares);

const store = storeCreator(createStore)(rootReducer);

export default store;

export const actions = {
  gameEnter: (...args) => {
    return store.dispatch(gameEnter(...args));
  },
  matchFind: (...args) => {
    return store.dispatch(matchFind(...args));
  },
  attack: (...args) => {
    return store.dispatch(attack(...args));
  },
  cast: (...args) => {
    return store.dispatch(cast(...args));
  },
};

export const selectors = {
  game() {
    return gameSelector(store.getState());
  },
  match() {
    return matchSelector(store.getState());
  },
};
