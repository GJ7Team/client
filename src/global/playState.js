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
    data.colonies.forEach(this._spawnColony, this);
  },

  _spawnColony: function (colony) {
    this.game.add.sprite(colony.x, colony.y, colony.image);
  }
};