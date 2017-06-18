import values from 'lodash/valuesIn';
import { STATES, COLORS } from '../constants';
import { addGradientText } from 'util/text';
import gameState from 'services/gameState';
import initScaling from 'util/initScaling';

export default {
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');

    this._statistics = gameState.getStatistics();
    gameState.resetStatistics();
  },

  create: function() {
    this.game.stage.disableVisibilityChange = true;
    initScaling(this.game).create();
    const background = this.game.add.sprite(0, 0, 'background');
    const resultData = gameState.getResult();

    const resultText = resultData.win ? 'You won!' : 'You lost!';
    addGradientText(this.game, {
      text: resultText,
      y: 40,
    });
    this.game.input.activePointer.capture = true;

    const { me, enemy } = this._statistics;
    const style = {
      font: '16px Courier bold',
      fill: COLORS.white,
      tabs: [200, 200, 200],
    };
    const headings = ['Spawned', 'Attacked', 'Actions efficiency'];
    const textX = 400;
    const textY = 120;
    const headingsHeight = 40;

    // YOU
    addGradientText(this.game, {
      text: 'You',
      x: 50,
      y: textY + 30,
      fontSize: 30,
      colorStops: [COLORS.lime, COLORS.darkgreen],
    });
    const headingsTextMe = this.game.add.text(textX, textY, '', {
      ...style,
      font: '20px Curier',
      fill: COLORS.lime,
    });
    headingsTextMe.parseList(headings);
    headingsTextMe.anchor.set(0.5, 0, 5);

    const scoresTextMe = this.game.add.text(textX, textY + headingsHeight, '', {
      ...style,
      fill: COLORS.lime,
      font: '30px Curier',
    });
    scoresTextMe.parseList(values(me));
    scoresTextMe.anchor.set(0.5, 0, 5);

    // ENEMY
    addGradientText(this.game, {
      text: 'Enemy',
      x: 60,
      y: textY + 150,
      fontSize: 30,
      colorStops: [COLORS.red, COLORS.darkred],
    });
    const headingsTextEnemy = this.game.add.text(textX, textY + 120, '', {
      ...style,
      font: '20px Curier',
      fill: COLORS.red,
    });
    headingsTextEnemy.parseList(headings);
    headingsTextEnemy.anchor.set(0.5, 0, 5);

    const scoresTextEnemy = this.game.add.text(
      textX,
      textY + 120 + headingsHeight,
      '',
      {
        ...style,
        fill: COLORS.red,
        font: '30px Curier',
      }
    );
    scoresTextEnemy.parseList(values(enemy));
    scoresTextEnemy.anchor.set(0.5, 0, 5);
  },

  update: function() {
    if (this.game.input.activePointer.isDown) {
      this.game.state.start(STATES.MENU);
    }
  },
};
