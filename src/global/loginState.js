import { actions } from '../store';
import { STATES, COLORS } from '../constants';
import { addGradientText } from '../util/text';
import initScaling from 'util/initScaling';

const ERROR_TEXT = 'Please enter your nickname';

const login = async function() {
  const value = this.input.value.replace(/ /g, '');

  if (!value) {
    this.errorText.setText(ERROR_TEXT);
    return false;
  }

  actions.gameEnter({
    name: this.input.value,
  });

  this.game.state.start(STATES.MENU);
};

export default {
  preload: function() {
    const game = this.game;
    this.game.load.image('background', 'assets/images/background.png');
    this.game.load.image('nick_input', 'assets/buttons/nick_input.png');
    this.button = game.load.spritesheet(
      'button',
      'assets/buttons/login.png',
      193,
      71
    );
  },

  update: function() {
    this.input.update();

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      // login();
      console.warn('enter', this.input.value);
    }
  },

  create: function() {
    const game = this.game;

    this.game.stage.disableVisibilityChange = true;
    initScaling(this.game).create();

    const background = game.add.sprite(0, 0, 'background');
    const inputBack = game.add.sprite(
      game.world.centerX - 165,
      game.world.centerY - 69,
      'nick_input'
    );
    background.name = 'background';
    const button1 = game.add.button(
      game.world.centerX,
      game.world.centerY + 80,
      'button',
      login.bind(this),
      this,
      2,
      1,
      0
    );
    button1.name = 'Play';
    button1.anchor.setTo(0.5, 0.5);
    button1.scale.setTo(1.5, 1.5);

    this.input = game.add.inputField(
      game.world.centerX - 150,
      game.world.centerY - 55,
      {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 290,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Nickname',
        blockInput: false,
        focusOutOnEnter: false,
      }
    );
    this.input.blockInput = false;
    this.input.startFocus();

    this.errorText = addGradientText(this.game, {
      text: '',
      y: 220,
      fontSize: 30,
      colorStops: [COLORS.red, COLORS.white],
    });
  },
};
