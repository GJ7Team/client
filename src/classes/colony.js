const INITIAL_FORCE = 10;
const ATTACK_MODIFICATOR = 0.65;
const MIN_ATTACK_REQUIREMENT = 25;

export default class Colony extends Phaser.Sprite {
  constructor(game, x, y, imageName) {
    super(game, x, y, imageName);

    this.force = INITIAL_FORCE;
  }

  // @TODO: consume from colony force 60%
  // do not allow to attack if colony force is not enough (25 poins min)
  attack() {
    if (this.canAttack()) {
      const attackPower = MATH.round(this.force * ATTACK_MODIFICATOR);

      this.changeForce(attackPower);
    }
  }

  canAttack() {
    return this.force >= MIN_ATTACK_REQUIREMENT;
  }

  // @TODO: add num to current colony force
  reinforce(num) {
    this.changeForce(num);
  }

  changeForce(num) {
    if (Number.isInteger(num)) {
      this.force += num;
    } else {
      console.warn(`reinforce: [${num}] should be an integer`);
    }

    return this.force;
  }
}