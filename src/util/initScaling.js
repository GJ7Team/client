export default function initScaling(game) {
    return {
        create: () => {

            game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Stretch to fill
            game.input.onDown.add(toggleFullScreen, this);
        },
    };
    function toggleFullScreen() {
        if (game.scale.isFullScreen) {
            // game.scale.stopFullScreen();
        } else {
            // game.scale.startFullScreen(false);
        }
    }
}


        