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

//   const scaleManager = new Phaser.ScaleManager(game, WORLD_SIZE.width, WORLD_SIZE.height);

//   console.warn('scaleManager', scaleManager);
//   scaleManager.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  const pluginManager = new Phaser.PluginManager(game)
  pluginManager.add(PhaserInput.Plugin);

  

  game.state.add('play', PlayState);
  game.state.add('video', videoDemoState);
  game.state.add('menuState', menuState);
  game.state.add('loginState', loginState);
  game.state.start('loginState');
};


  /*
    NO_SCALE:1
    RESIZE:3
    SHOW_ALL:2
    USER_SCALE 4
    */