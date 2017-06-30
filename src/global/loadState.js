import { STATES, BG_SET } from '../constants';
import initScaling from 'util/initScaling';

function goToLogin() {
  this.game.state.start(STATES.LOGIN);
}

export default {
  preload: function() {
    initScaling(this.game).create();
    const colony = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'colony'
    );
    colony.anchor.setTo(0.5, 0.5);
    this.game.add
      .tween(colony.scale)
      .to(
        { x: 1.5, y: 1.5 },
        2000,
        Phaser.Easing.Linear.None,
        true,
        0,
        1000,
        true
      );

    this.game.load.spritesheet(
      'kaboom',
      'assets/spizjenoe/explode.png',
      128,
      128
    );

    this.game.load.image('background', 'assets/images/background.png');
    this.game.load.image('nick_input', 'assets/buttons/nick_input.png');
    this.game.load.spritesheet('button', 'assets/buttons/login.png', 193, 71);

    this.game.load.image('play', 'assets/buttons/play.png');
    this.game.load.image('scoreboard', 'assets/buttons/scoreboard.png');
    this.game.load.spritesheet('back', 'assets/buttons/back.png', 193, 71);

    BG_SET.forEach(bgSrc => {
      this.game.load.shader(
        bgSrc.replace(/.frag/, ''),
        `assets/shaders/${bgSrc}`
      );
    });

    // levels
    this.game.load.json('level:1', 'data/level00.json');

    // colonies
    this.game.load.image('colony:ally', 'assets/images/colony/green.png');
    this.game.load.image('colony:neutral', 'assets/images/colony/blue.png');
    this.game.load.image('colony:enemy', 'assets/images/colony/red.png');

    // bacteria
    this.game.load.image(
      'bacteria:ally',
      'assets/images/cell_color/cell_2/cell_2_green.png'
    );
    this.game.load.image(
      'bacteria:enemy',
      'assets/images/cell_color/cell_2/cell_2_red.png'
    );

    // super bacteria
    this.game.load.image(
      'superBacteria:ally',
      'assets/images/cell_color/cell_2/super_cell_2_green.png'
    );
    this.game.load.image(
      'superBacteria:enemy',
      'assets/images/cell_color/cell_2/super_cell_2_red.png'
    );

    // music
    this.game.load.audio('game', ['assets/audio/game.mp3']);
    this.game.load.audio('pick', ['assets/audio/pick.mp3']);
    this.game.load.audio('kick', ['assets/audio/kick.mp3']);

    this.game.load.onLoadStart.add(() => console.warn('onLoadStart'), this);
    this.game.load.onFileComplete.add(
      () => console.warn('onFileComplete'),
      this
    );
    this.game.load.onLoadComplete.add(
      () => console.warn('onLoadComplete'),
      this
    );
  },

  create: function() {
    setTimeout(() => goToLogin.call(this), 500);
  },
};

// function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {}
