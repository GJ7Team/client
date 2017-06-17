import Colony from 'classes/colony';

export default {
  preload: function() {
    // background
    this.game.load.image('background', 'assets/images/background.png');

    // levels
    this.game.load.json('level:1', 'data/level00.json');

    // colonies
    this.game.load.image('colony:neutral', 'assets/images/colony_neutral.png');
    this.game.load.image('colony:enemy', 'assets/images/colony_enemy.png');
    this.game.load.image('colony:ally', 'assets/images/colony_ally.png');
  },

  create: function () {
    this.game.add.image(0, 0, 'background');

    this._loadLevel(this.game.cache.getJSON('level:1'));
  },

  _loadLevel: function (data) {
    // spawn colonies
    this.colonies = this.game.add.group();
    this._spawnColonies({ colonies: data.colonies });
  },

  _spawnColonies: function (data) {
    data.colonies.forEach(this._spawnColony, this);
  },

  _spawnColony: function (colony) {
    const sprite = new Colony(this.game, colony.x, colony.y, colony.image, colony.type);
    this.colonies.add(sprite);
  }
};