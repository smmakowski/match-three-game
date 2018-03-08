MyGame = MyGame || {};

MyGame.GameState = {
  init: function() {
    // set constants fofr game
    this.NUM_ROWWS = 8;
    this.NUM_COLS = 8;
    this.NUM_VARIATIONS = 7;
    this.BLOCK_SIZE = 35;
    this.ANIMATION_TIME = 200;
  },
  create: function() { // create scene here
  	// place background and add other sprites
    this.background = this.game.add.sprite(0, 0,'background');

    // board model
    this.board = new Board(null, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS); // TODO instantiate new board brah
    console.log('Now in GameState!');
  },
  update: function() { // update methid
  	// update will run overthing under this method periodically during runtime
  },
};
