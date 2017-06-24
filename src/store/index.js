import { compose, createStore, combineReducers, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import gameReducer, {
  gameSelector,
  gameEnter,
  myNameSelector,
  onlinePlayersSelector,
  playersOnlineChange,
} from './game';
import matchReducer, {
  matchSelector,
  matchFind,
  attack,
  subscribeAttack,
  subscribeMatchDisconnect,
  subscribeMatchTick,
  cast,
  win,
  lost,
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

function connect(action) {
  return (...args) => {
    const result = action(...args);
    if (typeof result === 'function') {
      return result(store.dispatch);
    }
    return store.dispatch(result);
  };
}

export const actions = {
  gameEnter: connect(gameEnter),
  matchFind: subscribe => {
    store.subscribe(() => {
      selectors.match();
    });

    return store.dispatch(matchFind());
  },
  attack: connect(attack),
  playersOnlineChange: connect(playersOnlineChange),
  subscribeAttack: connect(subscribeAttack),
  subscribeMatchDisconnect: connect(subscribeMatchDisconnect),
  subscribeMatchTick: connect(subscribeMatchTick),
  cast: connect(cast),
  win: connect(win),
  lost: connect(lost),
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
  onlinePlayersSelector() {
    return onlinePlayersSelector(store.getState());
  },
};
