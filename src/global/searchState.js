import { addGradientText } from 'util/text';
import subscribe, { actions, selectors } from '../store';
import { STATES } from '../constants';
import initScaling from 'util/initScaling';
import { addOnlineText } from 'util/text';
import onlinePlayers from 'util/onlinePlayers';

export default {
  preload: function() {
    actions.matchFind();

    const off = subscribe(() => {
      const { isSearching, map } = selectors.match();

      if (!isSearching && map) {
        off();
        this.game.state.start(STATES.PLAY);
      }
    });
  },

  create: function() {
    this.game.stage.disableVisibilityChange = true;
    initScaling(this.game).create();
    const background = this.game.add.sprite(0, 0, 'background');
    const backButton = this.game.add.button(
      10,
      10,
      'back',
      () => this.game.state.start(STATES.MENU),
      this,
      2,
      1,
      0
    );

    backButton.scale.setTo(0.3, 0.3);
    addGradientText(this.game, {
      text: 'Searching a match...',
    });

    this.game.input.activePointer.capture = true;
    this.onlinePlayers = onlinePlayers(this.game);
  },

  update: function() {
    this.onlinePlayers.update();
  },
};
