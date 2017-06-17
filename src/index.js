import 'babel-polyfill';
import PlayState from './global/playState';
import videoDemoState from './global/videoDemoState';
import menuState from './global/menuState';
import loginState from './global/loginState';
import resultState from './global/resultState';
import PhaserInput from 'lib/PhaserInput';

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

  //   const scaleManager = new Phaser.ScaleManager(game, WORLD_SIZE.width, WORLD_SIZE.height);

  //   console.warn('scaleManager', scaleManager);
  //   scaleManager.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  const pluginManager = new Phaser.PluginManager(game);
  pluginManager.add(PhaserInput.Plugin);

  game.state.add('play', PlayState);
  game.state.add('video', videoDemoState);
  game.state.add('menuState', menuState);
  game.state.add('loginState', loginState);
  game.state.add('resultState', resultState);
  game.state.start('loginState');
});
