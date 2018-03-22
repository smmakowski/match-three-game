MyGame = MyGame || {};

MyGame.BootState = {
  init: function() {
    // set white background color
    this.game.stage.backgroundColor = '#fff';
    // scaling and centering options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
  },
  preload: function() {
    //preload assets for PreloadState
    this.load.image('loadingBar', '../../assets/images/preloader-bar.png');

  },
  create: function() {
    //set stage background as white, start PreloadState
    this.state.start('PreloadState');
  }
}
