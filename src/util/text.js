export function addGradientText(game, options) {
  console.warn('options.text', options.text);
  console.warn('game', game);
  const gameText = game.add.text(
    game.world.centerX,
    game.world.centerY,
    options.text
  );
  //  Centers the text
  gameText.anchor.set(0.5);
  gameText.align = 'center';

  //  Our font + size
  gameText.font = 'Arial';
  gameText.fontWeight = 'bold';
  gameText.fontSize = 70;
  var grd = gameText.context.createLinearGradient(0, 0, 0, gameText.height);

  //  Add in 2 color stops
  grd.addColorStop(0, '#8ED6FF');
  grd.addColorStop(1, '#004CB3');
  gameText.fill = grd;
}
