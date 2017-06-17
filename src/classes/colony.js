import { GLOBAL_SPEED } from '../constants';

const INITIAL_ACTIVE_POWER = 10;
const INITIAL_NEUTRAL_POWER = 0;
const ATTACK_MODIFICATOR = 0.65;
const MIN_ATTACK_REQUIREMENT = 25;
const SPAWN_INTERVAL = Math.round(1000 / GLOBAL_SPEED);
const SPAWN_AMOUNT = 1;
const TYPES = {
  ally: 'ally',
  neutral: 'neutral',
  enemy: 'enemy',
};

export default class Colony extends Phaser.Sprite {
  constructor(game, x, y, imageName, type) {
    super(game, x, y, imageName);

    this.power = type === TYPES.neutral
      ? INITIAL_NEUTRAL_POWER
      : INITIAL_ACTIVE_POWER;
    this.type = type;

    this._createCounter();

    // start spawning bacteria
    if (this._colonyIsActive()) {
      this._startSpawn();
    }
  }

  update() {
    this.text.x = Math.floor(this.x + this.width / 2);
    this.text.y = Math.floor(this.y + this.height / 2);
    this.text.setText(this.power);
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

  // @TODO: consume from colony power 60%
  // do not allow to _attack if colony power is not enough (25 poins min)
  _attack(target) {
    if (!target) {
      return false;
    }

    console.log(target.key);

    if (this._canAttack()) {
      const attackPower = Math.round(this.power * ATTACK_MODIFICATOR);

      const attacked = this._changePower(-attackPower);
      console.log(`attacked with [${attacked}] bacteria`);

      const bacteries = this.game.add.group();
      bacteries.enableBody = true;
      const frame = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
      for (let i = 0; i < attackPower; i++) {
        createBacteria(this.game, bacteries, frame);
      }
    }

    function createBacteria(game, bacteries, frame) {
      var bacteria = bacteries.create(
        game.world.randomX,
        game.world.randomY,
        'bacteria'
      );
      bacteria.name = `Bacteria-${bacteries.length}`;
      bacteria.body.collideWorldBounds = true;
      // bacteria.body.bounce.setTo(0.8, 0.8);
      bacteria.body.velocity.setTo(
        10 + Math.random() * 40,
        10 + Math.random() * 40
      );
      bacteria.frame = frame;
      bacteria.scale.setTo(0.2, 0.2);
    }
  }

  _canAttack() {
    return true;
    // return this.power >= MIN_ATTACK_REQUIREMENT;
  }

  _colonyIsActive() {
    return this.type === TYPES.ally || this.type === TYPES.enemy;
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
}
