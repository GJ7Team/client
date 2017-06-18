import { addGradientText } from 'util/text';
import subscribe, { actions, selectors } from '../store';
import { STATES } from '../constants';
import initScaling from 'util/initScaling';

export default {
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');

    actions.matchFind();

    const off = subscribe(() => {
      const { isSearching, map } = selectors.match();

      if (!isSearching && map) {
        off();
        this.game.state.start(STATES.PLAY);
      }
    });
  },

  update: function() {},

  create: function() {
    this.game.stage.disableVisibilityChange = true;
    initScaling(this.game).create();
    const background = this.game.add.sprite(0, 0, 'background');

    addGradientText(this.game, {
      text: 'Searching a match...',
    });

    this.game.input.activePointer.capture = true;
  },
};
