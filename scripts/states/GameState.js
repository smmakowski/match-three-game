MyGame = MyGame || {};

MyGame.GameState = {
  init: function() {
    // set constants fofr game
    this.NUM_ROWS = 8;
    this.NUM_COLS = 8;
    this.NUM_VARIATIONS = 7;
    this.BLOCK_SIZE = 35; // pixels of a bean
    this.ANIMATION_TIME = 200;
  },

  create: function() { // create scene here
  	// place background and add other sprites
    this.background = this.game.add.sprite(0, 0,'background');
    this.blocks = this.add.group(); // add a group of blocks

    // board model
    this.board = new Board(this, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS); // TODO instantiate new board brah
    this.board.populateGrid();
    this.board.populateReserveGrid();
    console.log('Now in GameState!');
    this.renderBoard();
  },

  update: function() { // update methid
  	// update will run overthing under this method periodically during runtime
  },

  createBlock: function(x, y, data) {
    let block = this.blocks.getFirstExists(false);

    if (!block) {
      block = new Block(this, x, y, data);
      this.blocks.add(block);
    } else {
      block.reset(x, y, data);
    }
    return block;
  },

  renderBoard: function() {
    // this.createBlock(100, 100, {asset: 'block1', row: 1, col: 1});
    // creates semi transparent blakc square
    let squareBitmap = this.add.bitmapData(this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4); // create bi
    squareBitmap.ctx.fillStyle = '#000'; // set fill for bitmap
    squareBitmap.ctx.fillRect(0, 0, this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4); // set

    console.log(squareBitmap);

    for (let i = 0; i < this.NUM_ROWS; i++) {
      for (let j = 0; j < this.NUM_COLS; j++) {
        let x = 36 + j * (this.BLOCK_SIZE + 6);
        let y = 150 + i * (this.BLOCK_SIZE + 6);

        let square = this.game.add.sprite(x, y, squareBitmap);
        square.anchor.setTo(0.5);
        square.alpha = 0.2; // sets transparency

        this.createBlock(x, y, {asset: 'block' + this.board.grid[i][j], row: i, col: j});
        // // above creates a block based on  variation in particular slot
      }
    }
      this.game.world.bringToTop(this.blocks);
  }
};
