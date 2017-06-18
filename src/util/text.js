export function addGradientText(game, options = {}) {
  const normalized = {
    text: 'Lorem ipsum',
    x: game.world.centerX,
    y: game.world.centerY,
    fontSize: 70,
    colorStops: ['#8ED6FF', '#004CB3'],
    ...options,
  };

  console.warn('options.text', normalized.text);
  console.warn('game', game);
  const gameText = game.add.text(normalized.x, normalized.y, normalized.text);
  //  Centers the text
  gameText.anchor.set(0.5);
  gameText.align = 'center';

  //  Our font + size
  gameText.font = 'Arial';
  gameText.fontWeight = 'bold';
  gameText.fontSize = normalized.fontSize;
  var grd = gameText.context.createLinearGradient(0, 0, 0, gameText.height);

  //  Add in 2 color stops
  normalized.colorStops.forEach((color, i) => grd.addColorStop(i, color));
  gameText.fill = grd;
}

export function addMyNameText(game, options) {
  const gameText = game.add.text(
    120,
    20,
    options.text
  );
  //  Centers the text
  gameText.anchor.set(0.5);
  gameText.align = 'center';

  //  Our font + size
  gameText.font = 'Arial';
  gameText.fontWeight = 'bold';
  gameText.fontSize = 15;
  var grd = gameText.context.createLinearGradient(0, 0, 0, gameText.height);

  //  Add in 2 color stops
  grd.addColorStop(0, '#8ED6FF');
  grd.addColorStop(1, '#004CB3');
  gameText.fill = grd;
}

export function addEnemyNameText(game, options) {
  const gameText = game.add.text(
    game.world.width - 120,
    20,
    options.text
  );
  //  Centers the text
  gameText.anchor.set(0.5);
  gameText.align = 'center';

  //  Our font + size
  gameText.font = 'Arial';
  gameText.fontWeight = 'bold';
  gameText.fontSize = 15;
  var grd = gameText.context.createLinearGradient(0, 0, 0, gameText.height);

  //  Add in 2 color stops
  grd.addColorStop(0, '#D90000');
  grd.addColorStop(1, '#B20000');
  gameText.fill = grd;
}

