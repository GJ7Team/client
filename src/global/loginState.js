import { actions } from '../store';
import { STATES } from '../constants';
import initScaling from 'util/initScaling';

const login = async function() {
  actions.gameEnter({
    name: this.input.value,
  });

  this.game.state.start(STATES.MENU);
};

export default {
  preload: function() {
    const game = this.game;
    this.game.load.image('background', 'assets/images/background.png');
    this.button = game.load.spritesheet(
      'button',
      'assets/buttons/button_sprite_sheet.png',
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
    initScaling(game).create();

    const background = game.add.sprite(0, 0, 'background');
    background.name = 'background';
    const button1 = game.add.button(
      game.world.centerX,
      game.world.centerY * 0.5,
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
      game.world.centerX - 75,
      game.world.centerY,
      {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 150,
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
  },
};
