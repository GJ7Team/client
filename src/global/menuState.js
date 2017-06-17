import { STATES } from './../constants';

function goToPlayState() {
    this.game.state.start(STATES.PLAY);
}

function goToVideoState() {
    this.game.state.start(STATES.VIDEO);
}

export default {
  preload: function() {
    const game = this.game;
    this.back = game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
    this.game.load.image('background', 'assets/images/background.png');
  },

  create: function () {
    const game = this.game;

    const background = game.add.sprite(0, 0, 'background');
    background.name = 'background';

    //  Standard button (also used as our pointer tracker)
    const button1 = game.add.button(game.world.centerX, game.world.centerY * 0.5, 'button', goToPlayState.bind(this), this, 2, 1, 0);
    button1.name = 'Play';
    button1.angle = 360/Math.random()
    button1.anchor.setTo(0.5, 0.5);
    button1.scale.setTo(1.5, 1.5);

    //  Rotated button
    const button2 = game.add.button(game.world.centerX, game.world.centerY * 1.5, 'button', goToVideoState.bind(this), this, 2, 1, 0);
    button2.name = 'Video';
    // button2.angle = 24;
    button2.angle = 360/Math.random()
    button2.anchor.setTo(0.5, 0.5);
  }
};
