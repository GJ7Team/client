import { compose, createStore, combineReducers, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import gameReducer, { gameSelector, gameEnter, myNameSelector } from './game';
import matchReducer, {
  matchSelector,
  matchFind,
  attack,
  subscribeAttack,
  subscribeMatchDisconnect,
  subscribeMatchTick,
  cast,
} from './match';

const rootReducer = combineReducers({
  game: gameReducer,
  match: matchReducer,
});

const middlewares = [thunkMiddleware, loggerMiddleware];

let storeCreator = applyMiddleware.apply(null, middlewares);

const store = storeCreator(createStore)(rootReducer);

export default cb => {
  return store.subscribe(cb);
};

export const actions = {
  gameEnter: (...args) => {
    return store.dispatch(gameEnter(...args));
  },
  matchFind: subscribe => {
    store.subscribe(() => {
      selectors.match();
    });

    return store.dispatch(matchFind());
  },
  attack: (...args) => {
    return store.dispatch(attack(...args));
  },
  subscribeAttack(res) {
    subscribeAttack(res);
  },
  subscribeMatchDisconnect(res) {
    subscribeMatchDisconnect(res);
  },
  subscribeMatchTick(res) {
    subscribeMatchTick(res);
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
  getMyName() {
    return myNameSelector(store.getState());
  },
};
