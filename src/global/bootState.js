import { STATES } from '../constants';
import initScaling from 'util/initScaling';

function goToLoad() {
  this.game.state.start(STATES.LOAD);
}

export default {
  preload: function() {
    initScaling(this.game).create();
    this.game.load.image('colony', 'assets/images/colony/blue.png');
  },

  create: function() {
    goToLoad.call(this);
  },
};
