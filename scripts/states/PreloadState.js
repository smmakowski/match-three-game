MyGame = MyGame || {};

MyGame.PreloadState ={ 
  preload: function() {
    // add sprites for logos and loading bar
    this.loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    this.loadingBar.anchor.setTo(.5); // center anchor to midddle of bar
    this.load.setPreloadSprite(this.loadingBar); // crops arg image depening on load percentage
    // preload assets here
    this.load.image('background', '../../assets/images/sample-background.png');
  },
  create: function() {
    console.log('Now in PreloadState');
    this.state.start('HomeState'); // start gameState
  },
}
