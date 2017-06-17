export default class EventsCaptureManager {
  constructor(game, colonies) {
    this.game = game;
    this.colonies = colonies;

    //  Enable input
    this.enableInput();

    this.result = 'Drag a sprite';
  }

  enableInput() {
    this.colonies.inputEnableChildren = true;
    this.colonies.forEach((colony) => {
      colony.inputEnabled = true;
    });

    this.colonies.onChildInputUp.add(this.onUp, this);
  }

  onUp(sprite, pointer) {
    console.log('up', sprite.key, pointer);


  }

  render() {
    // this.game.debug.text("Left Button: " + this.game.input.activePointer.leftButton.isDown, 10, 10);
    // this.game.debug.text("Middle Button: " + this.game.input.activePointer.middleButton.isDown, 10, 74);
    // this.game.debug.text("Right Button: " + this.game.input.activePointer.rightButton.isDown, 10, 260 - 122);

    this.game.debug.text(this.result, 10, 20);
  }
}