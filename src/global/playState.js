import { actions, selectors } from '../store';
import Colony from 'classes/colony';
import { addMyNameText, addEnemyNameText, addOnlineText } from 'util/text';
import EventsCaptureManager from 'classes/eventsCaptureManager';
import {
  STATES,
  WORLD_SIZE,
  ATTACK_DIRECTION_COLOR,
  BG_SET,
} from '../constants';
import initScaling from 'util/initScaling';
import onlinePlayers from 'util/onlinePlayers';

function goToMenuState() {
  this.game.state.start(STATES.MENU);
}

function goToVideoState() {
  this.game.state.start(STATES.VIDEO);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
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

    this._loadLevel(match.map);

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
    this.onlinePlayers = onlinePlayers(this.game);

    this._initUserInteractions();
  },

  update: function() {
    this.captureManager.update();
    this.filter.update();
    this.onlinePlayers.update();
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
      colony.type,
      this.bitmapData,
      colony.id
    );

    this.colonies.add(sprite);
  },

  _initUserInteractions() {
    this.captureManager = new EventsCaptureManager(this.game, this.colonies);
    this.colonies.forEach(c => {
      c._setEventsCaptureManger(this.captureManager);
    });
  },
};
