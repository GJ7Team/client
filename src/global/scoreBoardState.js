import values from 'lodash/values';
import { actions } from '../store';
import { STATES, COLORS } from '../constants';
import { addGradientText } from 'util/text';

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
    const background = this.game.add.sprite(0, 0, 'background');

    // addGradientText(this.game, { text: 'Scoreboard?' });

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
      font: '16px Courier',
      fill: COLORS.black,
      tabs: [200, 200],
    };
    const ratings = this._getRatings();
    const headings = ['Name', 'Score'];

    if (!ratings.length) {
      return false;
    }

    this.headingsText = this.game.add.text(
      32,
      64,
      '',
      Object.assign({}, style, {
        font: '20px Curier',
      })
    );
    this.headingsText.parseList(headings);

    this.scoresText = this.game.add.text(32, 120, '', style);
    this.scoresText.parseList(ratings);

    // window.s = this.scoresText;
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

    return processed;
  },

  update: function() {
    // if (this.game.input.activePointer.isDown) {
    //   this.game.state.start(STATES.MENU);
    // }
  },
};
