MyGame = MyGame || {};

MyGame.HomeState = {
  init: function(message) {
      // method to initialize state
      this.title = 'Match\nThree\nGame';
      this.message = 'Click or Touch Text\nTo go to\nGame State';
  },
  create: function() {
    // add sprites
    console.log('Now on HomeState!');
    this.background = this.game.add.sprite(0, 0,'background');
    this.titleText = this.add.text(this.game.world.centerX, this.game.world.centerY - 150, this.title, titleTextStyle);
    this.titleText.anchor.setTo(.5);
    this.titleText.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
    this.homeText = this.add.text(this.game.world.centerX, this.game.world.centerY + 150, this.message, homeTextStyle);
    this.homeText.anchor.setTo(.5);
    this.homeText.inputEnabled = true;
    this.homeText.events.onInputDown.add(this.startGame, this);
    // call start method to enter game state (set as event handler)

    this.blinker = setInterval(function() {
      if (MyGame.HomeState.homeText.alpha) {
        MyGame.HomeState.homeText.alpha = 0;
      } else {
        MyGame.HomeState.homeText.alpha = 1;
      }
    }, 500);
  },

  startGame: function() {
    clearInterval(this.blinker);
    this.homeText.visible = true;
    this.state.start('GameState');
  }
}
