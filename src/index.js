import PlayState from './global/playState';
import videoDemoState from './global/videoDemoState';
import menuState from './global/menuState';
import loginState from './global/loginState';
import PhaserInput from 'lib/PhaserInput';


const WORLD_SIZE = {
  height: 414,
  width: 736
};

window.onload = () => {
  const game = new Phaser.Game(WORLD_SIZE.width, WORLD_SIZE.height, Phaser.AUTO, 'game');
  console.warn('PhaserInput', PhaserInput);
  const pluginManager = new Phaser.PluginManager(game)
  pluginManager.add(PhaserInput.Plugin);

  game.state.add('play', PlayState);
  game.state.add('video', videoDemoState);
  game.state.add('menuState', menuState);
  game.state.add('loginState', loginState);
  game.state.start('loginState');
};