import values from 'lodash/values';
import take from 'lodash/take';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { actions, selectors } from '../store';
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
      'assets/buttons/back.png',
      193,
      71
    );
  },

  create: function() {
    initScaling(this.game).create();

    this.game.stage.disableVisibilityChange = true;
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
      fill: COLORS.red,
      tabs: [50, 200, 200],
    };
    const ratings = this._getRatings();

    const headings = ['#', 'Name', 'Score'];
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
      fill: COLORS.white,
    });
    this.scoresText.parseList(ratings);
    this.scoresText.anchor.set(0.5, 0, 5);
  },

  _getRatings() {
    // const RATINGS = [
    //   {
    //     name: 'Витя',
    //     score: 100500,
    //   },
    //   {
    //     name: 'Семен',
    //     score: 100000,
    //   },
    //   {
    //     name: 'Евген',
    //     score: 500,
    //   },
    //   {
    //     name: 'Валерий С.',
    //     score: 100500,
    //   },
    //   {
    //     name: 'Наташа',
    //     score: 100000,
    //   },
    //   {
    //     name: 'Борик',
    //     score: 500,
    //   },
    //   {
    //     name: 'Степашка',
    //     score: 100500,
    //   },
    //   {
    //     name: 'Витя',
    //     score: 100500,
    //   },
    //   {
    //     name: 'Семен',
    //     score: 100000,
    //   },
    //   {
    //     name: 'Евген',
    //     score: 500,
    //   },
    //   {
    //     name: 'Валерий С.',
    //     score: 100500,
    //   },
    //   {
    //     name: 'Наташа',
    //     score: 100000,
    //   },
    //   {
    //     name: 'Борик',
    //     score: 500,
    //   },
    //   {
    //     name: 'Степашка',
    //     score: 100500,
    //   },
    // ];
    const game = selectors.game();
    const { wins, looses } = game.stats;

    const tmp = reduce(
      wins,
      (acc, value, key) => {
        return {
          ...acc,
          [key]: +value - (looses[key] ? looses[key] : 0),
        };
      },
      {}
    );

    // const sorted = sortBy(
    //   map(tmp, (score, name) => {
    //     return {
    //       score,
    //       name,
    //     }
    //   }),
    //   (user) => user.score
    // );

    const sorted = map(tmp, (score, name) => {
      return {
        score,
        name,
      };
    }).sort((a, b) => a.score < b.score);

    const normalized = sorted.map((user, index) => ({
      index: index + 1,
      ...user,
    }));

    return take(normalized, 10).map(entry => [
      entry.index,
      processName(entry.name),
      entry.score,
    ]);
  },

  update: function() {
    // if (this.game.input.activePointer.isDown) {
    //   this.game.state.start(STATES.MENU);
    // }
  },
};

function processName(name) {
  if (name.toLowerCase() === 'suka') {
    return 'REDISKA';
  }

  return name;
}
