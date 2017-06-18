import { actions } from '../store';
import { STATES } from '../constants';
import initScaling from 'util/initScaling';

function goToSeachMatch() {
  this.game.state.start(STATES.SEARCH_MATCH);
}

function goToPlayState() {
  this.game.state.start(STATES.PLAY);
}

function goToVideoState() {
  this.game.state.start(STATES.VIDEO);
}

function goToScoreboardState() {
  this.game.state.start(STATES.SCOREBOARD);
}

export default {
  preload: function() {
    const game = this.game;
    this.back = game.load.spritesheet(
      'button',
      'assets/buttons/button_sprite_sheet.png',
      193,
      71
    );
    this.game.load.image('background', 'assets/images/background.png');
  },

  create: function() {
    const game = this.game;
    initScaling(this.game).create();

    const background = game.add.sprite(0, 0, 'background');
    background.name = 'background';

    //  Standard button (also used as our pointer tracker)
    const button1 = game.add.button(
      game.world.centerX,
      game.world.centerY * 0.5,
      'button',
      goToSeachMatch.bind(this),
      this,
      2,
      1,
      0
    );
    button1.name = 'Play';
    button1.anchor.setTo(0.5, 0.5);
    button1.scale.setTo(1.5, 1.5);

    //  SCOREBOARD BUTTON
    const button2 = game.add.button(
      game.world.centerX,
      game.world.centerY * 1.05,
      'button',
      goToScoreboardState.bind(this),
      this,
      2,
      1,
      0
    );
    button2.name = 'Scoreboard';
    button2.anchor.setTo(0.5, 0.5);
    button2.scale.setTo(1, 1);
  },
};
