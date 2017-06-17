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
    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
    this.game.load.image('background', 'assets/images/background.png');
  },

  create: function () {
    const game = this.game;
    const background = game.add.sprite(0, 0, 'background');
    background.name = 'background';

    //  Standard button (also used as our pointer tracker)
    const button1 = game.add.button(100, 100, 'button', goToPlayState.bind(this), this, 2, 1, 0);
    button1.name = 'Play';
    button1.anchor.setTo(0.5, 0.5);

    //  Rotated button
    const button2 = game.add.button(330, 200, 'button', goToVideoState.bind(this), this, 2, 1, 0);
    button2.name = 'Video';
    button2.angle = 24;
    button2.anchor.setTo(0.5, 0.5);

    
  }
};


function examples() {
    //  Width scaled button
    button3 = game.add.button(100, 300, 'button', changeSky, this, 2, 1, 0);
    button3.name = 'sky3';
    button3.width = 300;
    button3.anchor.setTo(0, 0.5);
    // button3.angle = 0.1;

    //  Scaled button
    button4 = game.add.button(300, 450, 'button', changeSky, this, 2, 1, 0);
    button4.name = 'sky4';
    button4.scale.setTo(2, 2);

    //  Shrunk button
    button5 = game.add.button(100, 450, 'button', changeSky, this, 2, 1, 0);
    button5.name = 'sky5';
    button5.scale.setTo(0.5, 0.5);

    //  Scaled and Rotated button
    button6 = game.add.button(570, 200, 'button', changeSky, this, 2, 1, 0); // anchor 0.5
    button6.name = 'sky6';
    button6.angle = 32;
    button6.scale.setTo(2, 2);
    button6.anchor.setTo(0.5, 0.5);

    //  works regardless of world angle, parent angle or camera position
    // game.world.setBounds(0, 0, 2000, 2000);
    // game.world.angle = 10;
    // game.camera.x = 300;
}