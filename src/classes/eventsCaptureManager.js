import { COLONY_TYPES, STATES } from '../constants';
import { ATTACK_MODIFICATOR } from './colony';
import { actions } from '../store';
import gameState from 'services/gameState';

function goToResultState(game, resultData) {
  gameState.setResult(resultData);
  game.state.start(STATES.RESULT);
}

export default class EventsCaptureManager {
  constructor(game, colonies) {
    this.game = game;
    this.colonies = colonies;

    //  Enable input
    this.enableInput();
    this.winTimeout;

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

    actions.subscribeMatchDisconnect(() => {
      console.error('PLAYER LEFT. TODO YOU WIN');
    });

    actions.subscribeAttack(({ fromColonyId, toColonyId, attackPower }) => {
      let fromColony = null;
      let toColony = null;

      this.colonies.forEach(c => {
        if (c.id === fromColonyId) {
          fromColony = c;
        }
        if (c.id === toColonyId) {
          toColony = c;
        }
      });

      fromColony._enemyAttack(toColony, {
        attackPower,
      });
    });
    // superAI();
    setInterval(() => {
      // TODO fake server tick
      this.serverTick();
    }, 1000);
  }

  serverTick() {
    this.colonies.forEach(c => c.serverTick());
  }

  checkWinState() {
    if (this.winTimeout) {
      clearTimeout(this.winTimeout);
    }
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

    if (!hasEnemy) {
      // TODO CHECK enemy colonies in progress
      console.error('TODO SERVER - WIN STATE');
      this.winTimeout = setTimeout(
        () =>
          goToResultState(this.game, {
            win: true,
          }),
        4000
      );
    }

    if (!hasSelf) {
      // TODO CHECK enemy colonies in progress
      // LOSE
      console.error('TODO SERVER - LOOSE STATE');
      this.winTimeout = setTimeout(
        () =>
          goToResultState(this.game, {
            win: false,
          }),
        4000
      );
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
      const attackPower = Math.round(sourceColony.power * ATTACK_MODIFICATOR);

      actions.attack({
        fromColonyId: sourceColony.id,
        toColonyId: targetColony.id,
        attackPower,
      });

      sourceColony._attack(targetColon, {
        attackPower,
      });
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
