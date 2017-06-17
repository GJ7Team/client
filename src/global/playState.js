import Colony from 'classes/colony';
import EventsCaptureManager from 'classes/eventsCaptureManager';
import { STATES } from '../constants';

function goToMenuState() {
  this.game.state.start(STATES.MENU);
}

function goToVideoState() {
  this.game.state.start(STATES.VIDEO);
}

export default {
  preload: function() {
    this.button = this.game.load.spritesheet(
      'back',
      'assets/buttons/button_sprite_sheet.png',
      193,
      71
    );

    // background
    this.game.load.image('background', 'assets/images/background.png');

    // levels
    this.game.load.json('level:1', 'data/level00.json');

    // colonies
    this.game.load.image('colony:neutral', 'assets/images/colony_neutral.png');
    this.game.load.image('colony:enemy', 'assets/images/colony_enemy.png');
    this.game.load.image('colony:ally', 'assets/images/colony_ally.png');

    // music
    this.game.load.audio('game', ['assets/audio/game.mp3']);

    this.bacteria = this.game.load.spritesheet(
      'bacteria',
      'assets/spizjenoe/lineup.png',
      200,
      200
    );
  },

  create: function() {
    this.game.add.image(0, 0, 'background');

    var music = this.game.add.audio('game');
    // music.play();

    this._loadLevel(this.game.cache.getJSON('level:1'));

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

    this._initUserInteractions();
  },

  update: function() {},

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
      colony.type
    );
    this.colonies.add(sprite);
  },

  _initUserInteractions() {
    this.captureManager = new EventsCaptureManager(this.game, this.colonies);
  },
};
