import { actions, selectors } from '../store';
import { STATES } from '../constants';
import initScaling from 'util/initScaling';
import { addOnlineText } from 'util/text';

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
  create: function() {
    const game = this.game;

    this.game.stage.disableVisibilityChange = true;
    initScaling(this.game).create();

    const background = game.add.sprite(0, 0, 'background');
    background.name = 'background';

    //  Standard button (also used as our pointer tracker)
    const button1 = game.add.button(
      game.world.centerX,
      game.world.centerY * 0.5,
      'play',
      goToSeachMatch.bind(this),
      this
    );
    button1.name = 'Play';
    button1.anchor.setTo(0.5, 0.5);

    //  SCOREBOARD BUTTON
    const button2 = game.add.button(
      game.world.centerX,
      game.world.centerY * 1.05,
      'scoreboard',
      goToScoreboardState.bind(this),
      this
    );
    button2.name = 'Scoreboard';
    button2.anchor.setTo(0.5, 0.5);
    this.playersText = addOnlineText(this.game, {
      text: selectors.onlinePlayersSelector(),
    });
  },
  update: function() {
    const online = selectors.onlinePlayersSelector();
    this.playersText.text = `${online.length} Online - ${online}`;
  },
};
