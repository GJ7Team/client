import values from 'lodash/values';
import take from 'lodash/take';
import { actions } from '../store';
import { STATES, COLORS } from '../constants';
import { addGradientText } from 'util/text';
import initScaling from 'util/initScaling';

function goToMenuState() {
  this.game.state.start(STATES.MENU);
}

export default {
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');

    this.button = this.game.load.spritesheet(
      'back',
      'assets/buttons/button_sprite_sheet.png',
      193,
      71
    );
  },

  create: function() {
    initScaling(this.game).create();
    const background = this.game.add.sprite(0, 0, 'background');

    addGradientText(this.game, {
      text: 'Scoreboard - top 10',
      y: 30,
      fontSize: 40,
      colorStops: [COLORS.darkred, COLORS.white],
    });

    this.game.input.activePointer.capture = true;

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

    this._loadRatings();
  },

  _loadRatings() {
    const style = {
      font: '16px Courier bold',
      fill: COLORS.darkred,
      tabs: [200, 200],
    };
    const ratings = this._getRatings();
    const headings = ['Name', 'Score'];
    const textX = this.game.world.centerX;
    const textY = 70;
    const headingsHeight = 50;

    if (!ratings.length) {
      return false;
    }

    this.headingsText = this.game.add.text(textX, textY, '', {
      ...style,
      font: '20px Curier',
    });
    this.headingsText.parseList(headings);
    this.headingsText.anchor.set(0.5, 0, 5);

    this.scoresText = this.game.add.text(textX, textY + headingsHeight, '', {
      ...style,
      fill: COLORS.darkorchid,
    });
    this.scoresText.parseList(ratings);
    this.scoresText.anchor.set(0.5, 0, 5);
  },

  _getRatings() {
    const RATINGS = [
      {
        name: 'Adolf',
        score: 100500,
      },
      {
        name: 'Кернос',
        score: 100000,
      },
      {
        name: 'Гамаз',
        score: 500,
      },
      {
        name: 'Adolf',
        score: 100500,
      },
      {
        name: 'Кернос',
        score: 100000,
      },
      {
        name: 'Гамаз',
        score: 500,
      },
      {
        name: 'Adolf',
        score: 100500,
      },
      {
        name: 'Кернос',
        score: 100000,
      },
      {
        name: 'Гамаз',
        score: 500,
      },
      {
        name: 'Adolf',
        score: 100500,
      },
      {
        name: 'Кернос',
        score: 100000,
      },
      {
        name: 'Гамаз',
        score: 500,
      },
      {
        name: 'Adolf',
        score: 100500,
      },
      {
        name: 'Кернос',
        score: 100000,
      },
      {
        name: 'Гамаз',
        score: 500,
      },
      {
        name: 'Adolf',
        score: 100500,
      },
      {
        name: 'Кернос',
        score: 100000,
      },
      {
        name: 'Гамаз',
        score: 500,
      },
      {
        name: 'Adolf',
        score: 100500,
      },
      {
        name: 'Кернос',
        score: 100000,
      },
      {
        name: 'Гамаз',
        score: 500,
      },
    ];
    const processed = RATINGS.map(entry => values(entry));

    return take(processed, 10);
  },

  update: function() {
    // if (this.game.input.activePointer.isDown) {
    //   this.game.state.start(STATES.MENU);
    // }
  },
};
