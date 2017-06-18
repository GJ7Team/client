import { actions, selectors } from '../store';
import Colony from 'classes/colony';
import { addMyNameText, addEnemyNameText } from 'util/text';
import EventsCaptureManager from 'classes/eventsCaptureManager';
import { STATES, WORLD_SIZE, ATTACK_DIRECTION_COLOR } from '../constants';
import initScaling from 'util/initScaling';

function goToMenuState() {
  this.game.state.start(STATES.MENU);
}

function goToVideoState() {
  this.game.state.start(STATES.VIDEO);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BG_SET = ['bg-bacteria.frag', 'bg-microflora.frag'];

export default {
  preload: function() {
    this.button = this.game.load.spritesheet(
      'back',
      'assets/buttons/back.png',
      193,
      71
    );

    // background
    BG_SET.forEach(bgSrc => {
      this.game.load.shader(
        bgSrc.replace(/.frag/, ''),
        `assets/shaders/${bgSrc}`
      );
    });

    this.game.load.image('background', 'assets/images/background.png');

    // levels
    this.game.load.json('level:1', 'data/level00.json');

    // colonies
    this.game.load.image(
      'colony:neutral',
      'assets/images/colony_color/colony_yellow.png'
    );
    this.game.load.image(
      'colony:enemy',
      'assets/images/colony_color/colony_red.png'
    );
    this.game.load.image(
      'colony:ally',
      'assets/images/colony_color/colony_green.png'
    );

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
  },

  create: function() {
    initScaling(this.game).create();

    this.game.stage.disableVisibilityChange = true;
    // background
    const randomIndex = getRandomInt(0, BG_SET.length - 1);

    const bgKey = BG_SET[randomIndex].replace(/.frag/, '');

    this.filter = new Phaser.Filter(
      this.game,
      null,
      this.game.cache.getShader(bgKey)
    );

    this.filter.addToWorld(0, 0, WORLD_SIZE.width, WORLD_SIZE.height);

    // set up bitmap data for direction indicator
    this.bitmapData = this.game.add.bitmapData(
      WORLD_SIZE.width,
      WORLD_SIZE.height
    );
    this.bitmapData.ctx.beginPath();
    this.bitmapData.ctx.lineWidth = '4';
    this.bitmapData.ctx.strokeStyle = ATTACK_DIRECTION_COLOR;
    this.bitmapData.ctx.stroke();
    this.game.add.sprite(0, 0, this.bitmapData);

    var gameMusic = this.game.add.audio('game');

    gameMusic.play();

    const match = selectors.match();
    debugger;

    this._loadLevel(match.map);
    // this._loadLevel(this.game.cache.getJSON('level:1'));

    const backButton = this.game.add.button(
      10,
      10,
      'back',
      goToMenuState.bind(this),
      this,
      2,
      1,
      0
    );

    backButton.scale.setTo(0.3, 0.3);

    // My name & enemy name
    const myName = selectors.getMyName();
    const enemyName = match.enemy.name;

    addMyNameText(this.game, { text: myName });
    addEnemyNameText(this.game, { text: enemyName });

    this._initUserInteractions();
  },

  update: function() {
    this.captureManager.update();
    this.filter.update();
  },

  render: function() {
    this.captureManager.render();
  },

  _loadLevel: function(data) {
    // spawn colonies
    this.colonies = this.game.add.group();
    this._spawnColonies({ colonies: data.colonies });
  },

  _spawnColonies: function(data) {
    data.colonies.forEach(this._spawnColony, this);
  },

  _spawnColony: function(colony) {
    const sprite = new Colony(
      this.game,
      colony.x,
      colony.y,
      colony.image,
      colony.type,
      this.bitmapData,
      colony.id
    );

    this.game.physics.arcade.enable(sprite);
    sprite.anchor.setTo(0, 0);
    sprite.body.immovable = true;
    this.colonies.add(sprite);
  },

  _initUserInteractions() {
    this.captureManager = new EventsCaptureManager(this.game, this.colonies);
    this.colonies.forEach(c => {
      c._setEventsCaptureManger(this.captureManager);
    });
  },
};
