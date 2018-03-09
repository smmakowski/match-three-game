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
  },

  getBlockFromColRow: function(pos) {
    let foundBlock;

    this.blocks.forEachAlive((block) => {
      if (block.row === pos.row && block.col === pos.col) {
        foundBlock = block;
      }
    });

    return foundBlock;
  },

  dropBlock: function(srcRow, tarRow, col) {
    const block = this.getBlockFromColRow({row: srcRow, col: col});
    const tarY = 150 + tarRow * (this.BLOCK_SIZE + 6); // set coordinates for col height target

    block.row = tarRow; // set new row for grid

    const blockMovement = this.game.add.tween(block); // add tween for block
    blockMovement.to({y: tarY}, this.ANIMATION_TIME); // set destination for tewen
    blockMovement.start(); // start animations
  },

  dropReserveBlock: function(srcRow, tarRow, col) {
    const x = 36 + col * (this.BLOCK_SIZE + 6); // set start point for x
    const y = -(this.BLOCK_SIZE + 6) * this.board.RESERVE_ROWS + srcRow * (this.BLOCK_SIZE * 6); // and of u


    const block = this.createBlock(x, y, {asset: 'block' + this.board.grid[tarRow][col], row: tarRow, col: col});
    // tarRow is used since the data for the board will have already been updated
    const tarY = 150 + tarRow * (this.BLOCK_SIZE + 6); // set coordinates for col height target

    block.row = tarRow; // set new row for grid

    const blockMovement = this.game.add.tween(block);
    blockMovement.to({y: tarY}, this.ANIMATION_TIME);
    blockMovement.start();
  },

  swapBlocks: function(block1, block2) {
    // set scale back to 1 for swap
    block1.scale.setTo(1);
    block2.scale.setTo(1);
    let block1Movement = this.game.add.tween(block1);
    block1Movement.to({x: block2.x, y: block2.y}, this.ANIMATION_TIME);

    block1Movement.onComplete.add(() => { // after meovement is complete
      this.board.swapBlocks(block1, block2); // swap blocks on the model


      if (!this.isReversingSwap) { // not currently reversing swap
        let chains = this.board.findAllChains();

        if (chains.length > 0) { // if there is a chain then clear and update
          this.board.clearAllChains();
          this.board.updateGrid();
        } else { // swap them back
          this.isReversingSwap = true;
          this.swapBlocks(block1, block2);
        }
      } else {
        this.isReversingSwap = false;
        this.clearSelection(); // clear selection
      }

    }, this);
    block1Movement.start();
    // move block 2
    let block2Movement = this.game.add.tween(block2);
    block2Movement.to({x: block1.x, y: block1.y}, this.ANIMATION_TIME);
    block2Movement.start();

  },

  pickBlock: function(block) {
    //only swap if allows
    if (this.isBoardBlocked) {
      return;
    }

    this.boardBoardBlocked = true;

    if (!this.selectedBlock) {
      block.scale.setTo(1.5);
      this.selectedBlock = block;
    } else {
      // only adjacted blocks can swapBlocks
      this.targetBlock = block; // set target block
      // if target is adjacent, swap
      console.log(MyGame.GameState.board.isAdjacent);
      if (this.board.isAdjacent(this.selectedBlock, this.targetBlock)) {
        this.swapBlocks(this.selectedBlock, this.targetBlock);
      } else {
        this.clearSelection();
      }
    }
  },

  clearSelection: function() { // clears selection
    this.isBoardBlocked = false;
    this.selectedBlock = null;
    this.blocks.setAll('scale.x', 1);
    this.blocks.setAll('scale.y', 1);
  }
};
