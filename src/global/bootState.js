import { STATES } from '../constants';
import initScaling from 'util/initScaling';

function goToLoad() {
  this.game.state.start(STATES.LOAD);
}

export default {
  preload: function() {
    this.game.load.image('colony', 'assets/images/colony/blue.png');

    this.game.load.image('colony:ally', 'assets/images/colony/green.png');
    this.game.load.image('colony:neutral', 'assets/images/colony/blue.png');
    this.game.load.image('colony:enemy', 'assets/images/colony/red.png');
  },

  create: function() {
    goToLoad.call(this);
  },
};
