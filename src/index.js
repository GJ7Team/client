import 'babel-polyfill';
import PlayState from './global/playState';
import menuState from './global/menuState';
import loginState from './global/loginState';
import resultState from './global/resultState';
import scoreState from './global/scoreState';
import searchState from './global/searchState';
import loadState from './global/loadState';
import bootState from './global/bootState';
import PhaserInput from 'lib/PhaserInput';
import { STATES } from './constants';
import { getSocket } from 'store/api';
import { actions } from 'store';

import './store';

import { WORLD_SIZE } from './constants';

const start = game => {
  window.onload = game;
  // document.addEventListener('deviceready', game, false);
};

start(() => {
  const game = new Phaser.Game(
    WORLD_SIZE.width,
    WORLD_SIZE.height,
    Phaser.AUTO,
    'game'
  );

  const pluginManager = new Phaser.PluginManager(game);
  pluginManager.add(PhaserInput.Plugin);

  game.state.add(STATES.PLAY, PlayState);
  game.state.add(STATES.MENU, menuState);
  game.state.add(STATES.LOGIN, loginState);
  game.state.add(STATES.RESULT, resultState);
  game.state.add(STATES.SCOREBOARD, scoreState);
  game.state.add(STATES.SEARCH_MATCH, searchState);
  game.state.add('loadState', loadState);
  game.state.add('bootState', bootState);
  game.state.start('bootState');
  // game.state.start(STATES.RESULT);

  initSubscriptions();
});

function initSubscriptions() {
  const socket = getSocket();

  socket.on('playersOnline', online => actions.playersOnlineChange(online));
}
