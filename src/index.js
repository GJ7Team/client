import PlayState from './global/playState';
import videoDemoState from './global/videoDemoState';

const WORLD_SIZE = {
  height: 414,
  width: 736
};

window.onload = () => {
  const game = new Phaser.Game(WORLD_SIZE.width, WORLD_SIZE.height, Phaser.AUTO, 'game');

  game.state.add('play', PlayState);
  game.state.add('video', videoDemoState);
  game.state.start('play');
};