import { COLONY_TYPES, STATES } from '../constants';

function goToResultState(game) {
  game.state.start(STATES.RESULT);
}

export default class EventsCaptureManager {
  constructor(game, colonies) {
    this.game = game;
    this.colonies = colonies;

    //  Enable input
    this.enableInput();

    // FAKE SERVER IVENTS EMITER
    const superAI = () => {
      const enemys = [];
      const neutrals = [];
      const allys = [];
      this.colonies.forEach(
        c => (c.type === COLONY_TYPES.enemy ? enemys.push(c) : null)
      );
      this.colonies.forEach(
        c => (c.type === COLONY_TYPES.neutral ? neutrals.push(c) : null)
      );
      this.colonies.forEach(
        c => (c.type === COLONY_TYPES.ally ? allys.push(c) : null)
      );
      if (enemys[0]) {
        enemys[0]._enemyAttack(neutrals[0] || allys[0]);
      }
    };
    superAI();
    setInterval(superAI, 3000);
  }

  checkWinState() {
    let hasEnemy = false;
    this.colonies.forEach(
      c => (c.type === COLONY_TYPES.enemy ? (hasEnemy = true) : null)
    );
    console.warn('checkWinState', hasEnemy);
    if (!hasEnemy) {
      // TODO CHECK enemy colonies in progress
      console.error('TODO SERVER - WIN STATE');
      goToResultState(this.game);
    }
  }

  enableInput() {
    this.colonies.inputEnableChildren = true;
    this.colonies.forEach(colony => {
      colony.inputEnabled = true;
    });

    this.colonies.onChildInputDown.add(this.onDown, this);
    this.colonies.onChildInputUp.add(this.onUp, this);
  }

  onDown(colony, pointer) {
    // setup attack direction
    this.game.input.addMoveCallback(this.onMouseMove, this);
    this.activeColony = colony;
    this.activeColony._startShowingAttackDirection();
  }

  onUp(sprite, pointer) {
    const sourceColony = sprite;
    const targetColony = this.getTargetColony(pointer);

    if (this.attackIsAllowed(sourceColony, targetColony)) {
      sourceColony._attack(targetColony);
    } else {
      sourceColony._stopShowingAttackDirection();
    }

    this.game.input.deleteMoveCallback(this.onMouseMove, this);
    this.activeColony = null;
  }

  // uodate attack direction
  onMouseMove(event) {
    if (!this.activeColony) {
      return false;
    }

    this.activeColony._updateAttackDirection(event);
  }

  attackIsAllowed(sourceColony, targetColony) {
    const isMine = sourceColony.type === COLONY_TYPES.ally;
    return (
      isMine && sourceColony && targetColony && sourceColony !== targetColony
    );
  }

  getTargetColony(pointer) {
    for (let i = 0, len = this.colonies.length; i < len; i++) {
      const colony = this.colonies.getAt(i);
      const colonyRectangle = new Phaser.Rectangle(
        colony.x,
        colony.y,
        colony.width,
        colony.height
      );

      if (Phaser.Rectangle.contains(colonyRectangle, pointer.x, pointer.y)) {
        return colony;
      }
    }

    return null;
  }

  update() {}

  render() {
    // this.game.debug.text("Left Button: " + this.game.input.activePointer.leftButton.isDown, 10, 10);
    // this.game.debug.text("Middle Button: " + this.game.input.activePointer.middleButton.isDown, 10, 74);
    // this.game.debug.text("Right Button: " + this.game.input.activePointer.rightButton.isDown, 10, 260 - 122);
    // this.game.debug.text(this.result, 10, 20);
  }
}
