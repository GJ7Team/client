import { actions } from '../store';
import { STATES } from '../constants';
import { addGradientText } from 'util/text';
import gameState from 'services/gameState';
import initScaling from 'util/initScaling';

export default {
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');
  },

  update: function() {
    if (this.game.input.activePointer.isDown) {
      this.game.state.start(STATES.MENU);
    }
  },

  create: function() {
    initScaling(this.game).create();
    const background = this.game.add.sprite(0, 0, 'background');
    const resultData = gameState.getResult();

    const resultText = resultData.win ? 'You won!' : 'You lost!';
    addGradientText(this.game, { text: resultText });
    this.game.input.activePointer.capture = true;
  },
};
