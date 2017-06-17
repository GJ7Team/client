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
    let interval = 500;
    const superAI = () => {
      if (interval < 4000) {
        interval = interval + 100;
      }
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
      if (enemys.length) {
        const enemy = enemys.sort((a, b) => b.power - a.power)[0];
        const ally = allys.sort((a, b) => a.power - b.power)[0];
        if (neutrals.length) {
          neutrals.forEach(n => {
            enemy._enemyAttack(n);
          });
        } else {
          enemy._enemyAttack(ally);
        }
      }
      setTimeout(superAI, interval);
    };
    superAI();
  }

  checkWinState() {
    let hasEnemy = false;
    let hasSelf = false;
    this.colonies.forEach(c => {
      if (c.type === COLONY_TYPES.enemy) {
        hasEnemy = true;
      }
      if (c.type === COLONY_TYPES.ally) {
        hasSelf = true;
      }
    });
    console.warn('checkWinState', hasEnemy);
    if (!hasEnemy) {
      // TODO CHECK enemy colonies in progress
      console.error('TODO SERVER - WIN STATE');
      setTimeout(() => goToResultState(this.game), 2000);
    }

    if (!hasSelf) {
      // TODO CHECK enemy colonies in progress
      // LOSE
      console.error('TODO SERVER - LOOSE STATE');
      setTimeout(() => goToResultState(this.game), 2000);
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
