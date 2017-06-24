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
  cast,
  subscribeAttack,
  subscribeSkill,
  subscribeMatchDisconnect,
  subscribeMatchTick,
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
  cast: connect(cast),
  playersOnlineChange: connect(playersOnlineChange),
  subscribeAttack: connect(subscribeAttack),
  subscribeSkill: connect(subscribeSkill),
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
