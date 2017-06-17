import { GLOBAL_SPEED, COLONY_TYPES, TYPE_TO_IMAGE } from '../constants';

const INITIAL_ACTIVE_POWER = 10;
const INITIAL_NEUTRAL_POWER = 0;
const ATTACK_MODIFICATOR = 0.65;
const MIN_ATTACK_REQUIREMENT = 10;
const SPAWN_INTERVAL = Math.round(1000 / GLOBAL_SPEED);
const SPAWN_AMOUNT = 1;

function enemyCollisionHandler(colony, bacteria) {
  console.warn('ENEMY collisionHandler');

  switch (colony.type) {
    case COLONY_TYPES.ally:
      colony._changePower(-1);
      if (colony.power === 0) {
        colony._changeType(COLONY_TYPES.neutral);
      }
      break;
    case COLONY_TYPES.neutral:
      colony._changePower(1);
      colony._changeType(COLONY_TYPES.enemy);
      break;
    case COLONY_TYPES.enemy:
      colony._changePower(1);
      break;
    default:
      console.error('[bacterium] Unknown type %s', colony.type);
      break;
  }

  setTimeout(() => bacteria.kill(), 1);
}

function collisionHandler(colony, bacteria) {
  console.warn('collisionHandler');

  switch (colony.type) {
    case COLONY_TYPES.ally:
      colony._changePower(1);
      break;
    case COLONY_TYPES.neutral:
      colony._changePower(1);
      colony._changeType(COLONY_TYPES.ally);
      break;
    case COLONY_TYPES.enemy:
      colony._changePower(-1);
      if (colony.power === 0) {
        colony._changeType(COLONY_TYPES.neutral);
      }
      break;
    default:
      console.error('[bacterium] Unknown type %s', colony.type);
      break;
  }

  setTimeout(() => bacteria.kill(), 1);
}

function createBacteria(x, y, game, bacteries, target, frame) {
  var bacteria = bacteries.create(x, y, 'bacteria');
  bacteria.name = `Bacteria-${bacteries.length}`;
  bacteria.body.collideWorldBounds = true;

  const Xvector = (target.x - bacteria.x) * 0.2 + Math.random() * 100;
  const Yvector = (target.y - bacteria.y) * 0.2 + Math.random() * 100;
  // console.warn('Xvector', Xvector, 'Yvector', Yvector)
  bacteria.body.allowGravity = true;
  bacteria.body.velocity.setTo(Xvector, Yvector);

  bacteria.frame = frame;
  bacteria.scale.setTo(0.2, 0.2);
}

export default class Colony extends Phaser.Sprite {
  constructor(game, x, y, imageName, type, graphicsCanvas) {
    const image = TYPE_TO_IMAGE[type];
    super(game, x, y, imageName);

    this.power = type === COLONY_TYPES.neutral
      ? INITIAL_NEUTRAL_POWER
      : INITIAL_ACTIVE_POWER;
    this.type = type;
    this.graphicsCanvas = graphicsCanvas;

    this._createCounter();

    // start spawning bacteria
    if (this._colonyIsActive()) {
      this._startSpawn();
    }
    this.colides = [];
    this.enemyColides = [];
  }

  update() {
    this.text.x = Math.floor(this.x + this.width / 2);
    this.text.y = Math.floor(this.y + this.height / 2);
    this.text.setText(this.power);

    this.colides.forEach(({ colony, bacteries }) => {
      this.game.physics.arcade.collide(
        colony,
        bacteries,
        // Atack collistion
        // We will count damage here
        collisionHandler,
        null,
        this
      );
    });

    this.enemyColides.forEach(({ colony, bacteries }) => {
      this.game.physics.arcade.collide(
        colony,
        bacteries,
        // Atack collistion
        // We will count damage here
        enemyCollisionHandler,
        null,
        this
      );
    });
  }

  _changeType(newType) {
    // TODO SERVER
    console.error(
      '[bacterium] Colony ownership change from %s to %s',
      this.type,
      newType
    );
    this.type = newType;
    this.loadTexture(TYPE_TO_IMAGE[newType], 0);
    if (!this.spawnInterval) {
      this._startSpawn();
    }
  }

  _createCounter() {
    const style = {
      font: '14px Arial',
      fill: '#000',
      wordWrap: true,
      wordWrapWidth: this.width,
      align: 'center',
    };

    this.text = this.game.add.text(0, 0, this.power, style);
    this.text.anchor.set(0.5);
  }

  _startSpawn() {
    this.spawnInterval = setInterval(this._spawn, SPAWN_INTERVAL);
  }

  _stopSpawn() {
    clearInterval(this.spawnInterval);
    this.spawnInterval = null;
  }

  _spawn = () => {
    this._changePower(SPAWN_AMOUNT);
  };

  _enemyAttack(target) {
    // EMENY Attack reversed for player
    this._attack(target, { enemyAttack: true });
  }

  // @TODO: consume from colony power 60%
  // do not allow to _attack if colony power is not enough (25 poins min)
  _attack(target, options) {
    if (!target) {
      return false;
    }

    if (this._canAttack()) {
      const attackPower = Math.round(this.power * ATTACK_MODIFICATOR);

      const attacked = this._changePower(-attackPower);
      console.log(`attacked with [${attacked}] bacteria`);

      const bacteries = this.game.add.group();
      bacteries.enableBody = true;

      const frame = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
      for (let i = 0; i < attackPower; i++) {
        createBacteria(this.x, this.y, this.game, bacteries, target, frame);
      }

      this._stopShowingAttackDirection();

      setTimeout(() => {
        bacteries.forEach(
          bacteria => {
            bacteria.body.velocity.setTo(0, 0);
            this.game.physics.arcade.accelerateToObject(bacteria, target, 60);
          },
          this.game.physics.arcade,
          false,
          200
        );
      }, 700);

      if (options && options.enemyAttack) {
        this.enemyColides.push({ colony: target, bacteries });
      } else {
        this.colides.push({ colony: target, bacteries });
      }
    }
  }

  _canAttack() {
    return true;
    // const isAlly = this.type === COLONY_TYPES.ally;
    // return isAlly && this.power >= MIN_ATTACK_REQUIREMENT;
  }

  _colonyIsActive() {
    return this.type === COLONY_TYPES.ally || this.type === COLONY_TYPES.enemy;
  }

  // @TODO: add num to current colony power
  reinforce(num) {
    const reinforced = this._changePower(num);

    console.log(`reinforced with [${reinforced}] bacteria`);
  }

  _changePower(num) {
    if (Number.isInteger(num)) {
      this.power += num;
    } else {
      console.warn(`reinforce: [${num}] should be an integer`);
    }

    return this.power;
  }

  // @TODO: check https://codepen.io/ada-lovecraft/pen/dAjDp
  _startShowingAttackDirection() {
    if (!this._canAttack()) {
      return false;
    }

    this.graphicsCanvas.clear();
    this.graphicsCanvas.lineStyle(10, 0xffd900, 1);
    this.graphicsCanvas.moveTo(
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }

  _updateAttackDirection(event) {
    if (!this._canAttack()) {
      return false;
    }
    this.graphicsCanvas.moveTo(
      this.x + this.width / 2,
      this.y + this.height / 2
    );
    this.graphicsCanvas.lineTo(event.x, event.y);
  }

  _stopShowingAttackDirection() {
    this.graphicsCanvas.clear();
  }
}
