// class to represent board/board state for game
class Board {
  constructor(state, rows, cols, blockVariations) {
    this.state = state;
    this.rows = rows;
    this.cols = cols;
    this.blockVariations = blockVariations;

    this.grid = []; // main grid
    // initialize the board with all '0's (nothing in slot); beans are represented using numbers
    for (let i = 0; i < rows; i++) {
      this.grid.push([]);

      for (let j = 0; j < cols; j++) {
          this.grid[i].push(0);
      }
    }
    this.reserveGrid = []; // reserve grid goes on tip for wqhen new blocks are needed
    // blocks that only come when certain blocks are destroyed

    this.RESERVE_ROWS = this.rows; // update to be the same number as .rows in case entire column is empty during update()

    for (let i = 0; i < this.RESERVE_ROWS; i++) {
      this.reserveGrid.push([]);

      for (let j = 0; j < cols; j++) {
          this.reserveGrid[i].push(0);
      }
    }
  }

  populateGrid() {
    let variation;
    let board = this; // context
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        variation = Math.ceil(Math.random() * board.blockVariations);
        this.grid[i][j] = variation;
      }
    }
  }

  populateReserveGrid() {
    let variation;
    let board = this;
    for (let i = 0; i < this.RESERVE_ROWS; i++) {
      for (let j = 0; j < this.cols; j++) {
        variation = Math.ceil(Math.random() * board.blockVariations);
        this.reserveGrid[i][j]= variation;
      }
    }
  }

  boardToString() {
    let str = '';
    // add reserve grid to string
    for (let i = 0; i < this.RESERVE_ROWS; i++) {
      for (let j = 0; j < this.cols - 1; j++) {
       str += this.reserveGrid[i][j] + ' ';
      }

      str += this.reserveGrid[i][this.cols - 1];
      str += '\n';
    }

    for (let i = 0; i < this.cols; i++) {
      str += '- ';
    }

    str += '\n';

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols - 1; j++) {
       str += this.grid[i][j] + ' ';
      }

      str += this.grid[i][this.cols - 1];
      str += '\n';
    }
    console.log(str);
  }

  swapBlocks(source, target) { // takes two objs with x and y properties
    let temp = this.grid[source.row][source.col]; // set temporary variabl

    this.grid[source.row][source.col] = this.grid[target.row][target.col]; // swap A
    this.grid[target.row][target.col] = temp; // swap B
  }

  isAdjacent(source, target) {
    const rowDiff = Math.abs(source.row - target.row);
    const colDiff = Math.abs(source.col - target.col);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  isChained(block) { // postion for one block {rows: x, col: y}
    let isChained = false;
    let blockVar = this.grid[block.row][block.col];
    let row = block.row;
    let col = block.col;

    // test left
    if (blockVar === this.grid[row][col - 1] && blockVar === this.grid[row][col - 2]) {
      isChained = true;
    }

    // test right
    if (blockVar === this.grid[row][col + 1] && blockVar === this.grid[row][col + 2]) {
      isChained = true;
    }
    // test up
    if (this.grid[row - 2]) {
      if (blockVar === this.grid[row - 1][col] && blockVar === this.grid[row - 2][col]) {
        isChained = true;
      }
    }

    // test down
    if (this.grid[row + 2]) {
      if (blockVar === this.grid[row + 1][col] && blockVar === this.grid[row + 2][col]) {
        isChained = true;
      }
    }

    // center horizontal
    if (this.grid[row][col - 1] === blockVar && this.grid[row][col + 1] === blockVar) {
      isChained = true;
    }

    // center vertical
    if (this.grid[row + 1] && this.grid[row - 1]) {
      if (blockVar === this.grid[row + 1][col] && blockVar === this.grid[row - 1][col]) {
        isChained = true;
      }
    }

    return isChained;
  }

  findAllChains() {
    let chains = [];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.isChained({row: i, col: j})) {
          chains.push({row: i, col: j});
        }
      }
    }
    return chains;
  }

  clearAllChains() {
    let allChains = this.findAllChains();
    allChains.forEach((block) => {
      this.grid[block.row][block.col] = 0;
      
      if (this.state) { // added to work with mocha testing
        this.state.getBlockFromColRow(block).kill(); // kills block on grid
      }
      // this.state.getBlockFromColRow(block).kill(); // kills block on grid
    }, this);
  }

  dropBlocks(srcRow, tarRow, col) { // drops block in main grid from one popsiton to another
    this.grid[tarRow][col] = this.grid[srcRow][col];
    this.grid[srcRow][col] = 0;
  }

  dropReserveBlocks(srcRow, tarRow, col) { // drops block in reserve frid to main grid
    this.grid[tarRow][col]= this.reserveGrid[srcRow][col];
    this.reserveGrid[srcRow][col] = 0;
  }

  updateGrid() {
    // start at bottom and work to top
    for (let i = this.rows - 1; i >=0; i--) {
      // iterate through row
      for (let j = 0; j < this.cols; j++) {
        let block = this.grid[i][j];

        if (block === 0) { // if block is 0
          let foundBlock = false; // start looking for filled block

          for (let k = i - 1; k >= 0; k--) { // go up colum
            if (this.grid[k][j] > 0) { // if space is not 0
              this.dropBlocks(k , i, j); // drop block into current position
              foundBlock = true; // set found to ture
              break; // exit loop
            }
          }

          if (!foundBlock) { // if still havent found block to drop
            for (let l = this.RESERVE_ROWS - 1; l >= 0; l--) { // go up colum
              if (this.reserveGrid[l][j] > 0) { // if space is not 0
                this.dropReserveBlocks(l, i, j); // drop block into current position
                foundBlock = true; // set found to ture
                break; // exit loop
              }
            }
          }
        }
      }

    }
    this.populateReserveGrid();
  }
}


// NOTE: 'module.exports' is used for mocha testing. Internet browser will throw 'Uncaught ReferenceError'.
// Please disregard this error, as it will not effect the actual game.
module.exports = {
  Board
}
