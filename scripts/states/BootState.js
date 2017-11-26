let BootState = {
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
  },
  preload: function() {
    //preload assets for PreloadState
    this.load.image('loadingBar', '../../assets/images/bar.png');

  },
  create: function() {
    //set stage background as white, start PreloadState
    console.log('Now in Bootstate');
    this.game.stage.backgroundColor = '#fff';
    this.state.start('PreloadState');
  }
}
