MyGame = MyGame || {};

MyGame.GameState = {
  create: function() { // create scene here
  	// place background and add other sprites
    this.background = this.game.add.sprite(0, 0,'background');
    console.log('Now in GameState!');
  },
  update: function() { // update methid
  	// update will run overthing under this method periodically during runtime
  },
};
