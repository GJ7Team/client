export default class EventsCaptureManager {
  constructor(game, colonies) {
    this.game = game;
    this.colonies = colonies;

    //  Enable input
    this.enableInput();

    // this.result = 'Drag a sprite';
  }

  enableInput() {
    this.colonies.inputEnableChildren = true;
    this.colonies.forEach((colony) => {
      colony.inputEnabled = true;
    });

    this.colonies.onChildInputUp.add(this.onUp, this);
  }

  onUp(sprite, pointer) {
    const sourceColony = sprite;
    const targetColony = this.getTargetColony(pointer);

    this.checkAttackCondition(sourceColony, targetColony);
  }

  checkAttackCondition(sourceColony, targetColony) {
    if (sourceColony && targetColony && sourceColony !== targetColony) {
      sourceColony._attack(targetColony);
    }
  }

  getTargetColony(pointer) {
    for (let i = 0, len = this.colonies.length; i < len; i++) {
      const colony = this.colonies.getAt(i);
      const colonyRectangle = new Phaser.Rectangle(colony.x, colony.y, colony.width, colony.height);

      if (Phaser.Rectangle.contains(colonyRectangle, pointer.x, pointer.y)) {
        return colony;
      }
    }

    return null;
  }


  render() {
    // this.game.debug.text("Left Button: " + this.game.input.activePointer.leftButton.isDown, 10, 10);
    // this.game.debug.text("Middle Button: " + this.game.input.activePointer.middleButton.isDown, 10, 74);
    // this.game.debug.text("Right Button: " + this.game.input.activePointer.rightButton.isDown, 10, 260 - 122);

    // this.game.debug.text(this.result, 10, 20);
  }
}