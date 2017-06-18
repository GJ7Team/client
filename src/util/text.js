export function addGradientText(game, options) {
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

