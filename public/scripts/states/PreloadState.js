MyGame = MyGame || {};

MyGame.PreloadState = {
  preload: function() {
    // add sprites for logos and loading bar and text
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(.5);
    this.loadText = this.add.text(this.game.world.centerX, this.game.world.centerY + 100, "Now loading...", homeTextStyle);
    this.loadText.anchor.setTo(0.5);
    this.loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 150, 'loadingBar');
    this.loadingBar.anchor.setTo(.5); // center anchor to midddle of bar
    this.loadingBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.loadingBar); // crops arg image depening on load percentage
    // preload assets here
    this.load.image('background', '../../assets/images/backyard2.pg');
    this.load.image('block1', '../../assets/images/bean_blue.png');
    this.load.image('block2', '../../assets/images/bean_green.png');
    this.load.image('block3', '../../assets/images/bean_orange.png');
    this.load.image('block4', '../../assets/images/bean_pink.png');
    this.load.image('block5', '../../assets/images/bean_purple.png');
    this.load.image('block6', '../../assets/images/bean_yellow.png');
    this.load.image('block7', '../../assets/images/bean_red.png');
    this.load.image('block8', '../../assets/images/bean_white.png');
    this.load.image('deadBlock', '../../assets/images/bean_dead.png');
  },
  create: function() {
    context = this;
    setTimeout(function() {
      context.loadText.setText('Finished Loading!');
    }, 1500);
    setTimeout(function() {
      context.state.start('HomeState'); // start gameState
    }, 2000);

  },
}
