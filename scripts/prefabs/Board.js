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

    this.RESERVE_ROWS = this.rows >= 4 ? this.rows - 2 : 2; // update to be 2 less than this.rows to accomdate any number or rows

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
}

// NOTE: 'module.exports' is used for mocha testing. Internet browser will throw 'Uncaught ReferenceError'.
// Please disregard this error, as it will not effect the actual game.
module.exports = {
  Board
}
