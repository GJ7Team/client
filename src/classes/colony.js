import { addGradientText } from 'util/text';
import {
  COLORS,
  GLOBAL_SPEED,
  COLONY_TYPES,
  BACTERIA_TYPES,
  COLONY_TYPE_TO_IMAGE,
  BACTERIA_TYPE_TO_IMAGE,
  ATTACK_DIRECTION_COLOR,
} from '../constants';

const INITIAL_ACTIVE_POWER = 10;
const INITIAL_NEUTRAL_POWER = 0;
const ATTACK_MODIFICATOR = 0.65;
const MIN_ATTACK_REQUIREMENT = 10;
const SPAWN_INTERVAL = Math.round(1000 / GLOBAL_SPEED);
const SPAWN_AMOUNT = 1;
const RADIUS_DELTA = 10;
const ANIMATION_REMOVAL_DELAY = 200;

function enemyCollisionHandler(colony, bacteria) {
  console.info('[bacterium] enmy colision', bacteria._power);
  const power = bacteria._power || 1;

  switch (colony.type) {
    case COLONY_TYPES.ally:
      colony._changePower(-power);
      if (colony.power === 0) {
        colony._changeType(COLONY_TYPES.neutral);
      }
      if (colony.power < 0) {
        colony.power = -colony.power;
        colony._changeType(COLONY_TYPES.enemy);
      }
      break;
    case COLONY_TYPES.neutral:
      colony._changePower(power);
      colony._changeType(COLONY_TYPES.enemy);
      break;
    case COLONY_TYPES.enemy:
      colony._changePower(power);
      break;
    default:
      console.error('[bacterium] Unknown type %s', colony.type);
      break;
  }

  setTimeout(() => bacteria.kill(), 1);
}

function collisionHandler(colony, bacteria) {
  console.info('[bacterium] colision', bacteria._power);
  const kickMusic = this.game.add.audio('kick');
  const power = bacteria._power || 1;
  switch (colony.type) {
    case COLONY_TYPES.ally:
      colony._changePower(power);
      break;
    case COLONY_TYPES.neutral:
      colony._changePower(power);
      colony._changeType(COLONY_TYPES.ally);
      break;
    case COLONY_TYPES.enemy:
      kickMusic.play();
      colony._changePower(-power);
      if (colony.power === 0) {
        colony._changeType(COLONY_TYPES.neutral);
      }
      if (colony.power < 0) {
        colony.power = -colony.power;
        colony._changeType(COLONY_TYPES.ally);
      }
      break;
    default:
      console.error('[bacterium] Unknown type %s', colony.type);
      break;
  }

  setTimeout(() => bacteria.kill(), 1);
}

function createBacteria(x, y, game, bacteries, target, isAlly) {
  const bacteriaImage =
    BACTERIA_TYPE_TO_IMAGE[BACTERIA_TYPES[isAlly ? 'ally' : 'enemy']];

  var bacteria = bacteries.create(x, y, bacteriaImage);
  bacteria.name = `Bacteria-${bacteries.length}`;
  bacteria.body.collideWorldBounds = true;

  const Xvector = (target.x - bacteria.x) * 0.2 + Math.random() * 100;
  const Yvector = (target.y - bacteria.y) * 0.2 + Math.random() * 100;
  // console.warn('Xvector', Xvector, 'Yvector', Yvector)
  bacteria.body.allowGravity = true;
  bacteria.body.velocity.setTo(Xvector, Yvector);

  bacteria.scale.setTo(0.2, 0.2);
}

function createSuperBacteria(x, y, game, bacteries, target, isAlly, power) {
  const bacteriaImage =
    BACTERIA_TYPE_TO_IMAGE[BACTERIA_TYPES[isAlly ? 'ally' : 'enemy']];

  var bacteria = bacteries.create(x, y, bacteriaImage);
  bacteria.name = `Bacteria-${bacteries.length}`;
  bacteria.body.collideWorldBounds = true;

  const Xvector = (target.x - bacteria.x) * 0.2 + Math.random() * 100;
  const Yvector = (target.y - bacteria.y) * 0.2 + Math.random() * 100;
  // console.warn('Xvector', Xvector, 'Yvector', Yvector)
  bacteria.body.allowGravity = true;
  const angle = bacteria.body.velocity.setTo(Xvector, Yvector);
  // console.warn('angle', angle);

  bacteria.scale.setTo(0.8, 0.8);
  bacteria._power = power;
}

export default class Colony extends Phaser.Sprite {
  constructor(game, x, y, imageName, type, bitmapData, id) {
    const image = COLONY_TYPE_TO_IMAGE[type];
    super(game, x, y, imageName);

    this.id = id;

    this.power = type === COLONY_TYPES.neutral
      ? INITIAL_NEUTRAL_POWER
      : INITIAL_ACTIVE_POWER;
    this.type = type;
    this.bitmapData = bitmapData;
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
    this.radius = Math.floor(this.width / 2) + RADIUS_DELTA;
    this.graphicsColor = ATTACK_DIRECTION_COLOR;

    this._createCounter();

    // start spawning bacteria
    if (this._colonyIsActive()) {
      this._startSpawn();
    }
    this.colides = [];
    this.enemyColides = [];
    this.eventsCaptureManger = null;
  }

  _setEventsCaptureManger(manger) {
    this.eventsCaptureManger = manger;
  }

  update() {
    this.text.x = Math.floor(this.center.x);
    this.text.y = Math.floor(this.center.y);
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
    this.loadTexture(COLONY_TYPE_TO_IMAGE[newType], 0);
    if (newType !== COLONY_TYPES.neutral && !this._hasSpawn()) {
      this._startSpawn();
    }

    if (newType === COLONY_TYPES.neutral && this._hasSpawn()) {
      this._stopSpawn();
    }
    this.eventsCaptureManger.checkWinState();
  }

  _createCounter() {
    this.text = addGradientText(this.game, {
      text: this.power,
      y: 0,
      x: 0,
      fontSize: 18,
      colorStops: [COLORS.white, COLORS.white],
    });
    this.text.wordWrap = true;
    this.text.wordWrapWidth = this.width;
  }

  _startSpawn() {
    const pickMusic = this.game.add.audio('pick');
    pickMusic.play();
    this.spawnInterval = setInterval(this._spawn, SPAWN_INTERVAL);
  }

  _stopSpawn() {
    clearInterval(this.spawnInterval);
    this.spawnInterval = null;
  }

  _spawn = () => {
    this._changePower(SPAWN_AMOUNT);
  };

  _hasSpawn = () => {
    return this.spawnInterval > 0;
  };

  _enemyAttack(target) {
    // EMENY Attack reversed for player
    this._attack(target, { enemyAttack: true });
  }

  // @TODO: consume from colony power 60%
  _attack(target, options) {
    const attackPower = Math.round(this.power * ATTACK_MODIFICATOR);

    const attacked = this._changePower(-attackPower);
    console.log(`attacked with [${attacked}] bacteria`);

    if (this._isAlly()) {
      this._stopShowingAttackDirection(target);
    }

    const bacteries = this.game.add.group();
    bacteries.enableBody = true;

    let speed = 60;
    if (attackPower > 50) {
        createSuperBacteria(
          this.x,
          this.y,
          this.game,
          bacteries,
          target,
          this._isAlly(),
          attackPower
        );
        speed = 150;
    } else {
      for (let i = 0; i < attackPower; i++) {
        createBacteria(
          this.x,
          this.y,
          this.game,
          bacteries,
          target,
          this._isAlly()
        );
      }
    }

    setTimeout(() => {
      bacteries.forEach(
        bacteria => {
          bacteria.body.velocity.setTo(0, 0);
          this.game.physics.arcade.accelerateToObject(bacteria, target, speed);
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

  _canAttack() {
    return true;
    // const isAlly = this.type === COLONY_TYPES.ally;
    // return isAlly && this.power >= MIN_ATTACK_REQUIREMENT;
  }

  _colonyIsActive() {
    return this.type === COLONY_TYPES.ally || this.type === COLONY_TYPES.enemy;
  }

  _isAlly() {
    return this.type === COLONY_TYPES.ally;
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

  _updateAttackDirection(event) {
    if (!this._isAlly()) {
      return false;
    }

    this.lastPossibleAttackX = event.x;
    this.lastPossibleAttackY = event.y;

    this._renderStartingDirection();
    this.bitmapData.render();
  }

  _renderStartingDirection() {
    this.bitmapData.clear();
    this.bitmapData.ctx.beginPath();
    this.bitmapData.ctx.beginPath();
    this.bitmapData.ctx.moveTo(this.center.x, this.center.y);
    this.bitmapData.ctx.lineTo(
      this.lastPossibleAttackX,
      this.lastPossibleAttackY
    );
    this.bitmapData.ctx.lineWidth = 4;
    this.bitmapData.ctx.stroke();
    this.bitmapData.ctx.closePath();

    this.bitmapData.circle(
      this.center.x,
      this.center.y,
      this.radius,
      this.graphicsColor
    );
  }

  _stopShowingAttackDirection = target => {
    if (!target) {
      return this.bitmapData.clear();
    }

    const halfTargetWidth = Math.floor(target.width / 2);
    const halfTargetHeight = Math.floor(target.height / 2);
    const targetRadius = halfTargetWidth + RADIUS_DELTA;
    this._renderStartingDirection();
    this.bitmapData.circle(
      target.x + halfTargetWidth,
      target.y + halfTargetHeight,
      targetRadius,
      this.graphicsColor
    );
    this.bitmapData.render();

    setTimeout(() => {
      this.bitmapData.clear();
    }, ANIMATION_REMOVAL_DELAY);
  };
}
