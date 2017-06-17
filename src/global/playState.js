export default {
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');
  },

  create: function () {
    this.game.add.image(0, 0, 'background');
  }
};