import { addGradientText } from 'util/text';
import subscribe, { actions, selectors } from '../store';
import { STATES } from '../constants';

export default {
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');

    actions.matchFind();
    const off = subscribe(() => {
      const { isSearching } = selectors.match();

      if (!isSearching) {
        off();
        this.game.state.start(STATES.PLAY);
      }
    });
  },

  update: function() {},

  create: function() {
    const background = this.game.add.sprite(0, 0, 'background');

    addGradientText(this.game, {
      text: 'Search match...',
    });

    this.game.input.activePointer.capture = true;
  },
};
