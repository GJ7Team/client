import { actions } from '../store';
import { STATES } from '../constants';
import { addGradientText } from 'util/text';

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
    const background = this.game.add.sprite(0, 0, 'background');

    addGradientText(this.game, { text: 'Did you win?' });
    this.game.input.activePointer.capture = true;
  },
};
