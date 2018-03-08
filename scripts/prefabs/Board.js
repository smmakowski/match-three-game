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

    this.RESERVE_ROWS = 5;

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
        variation = Math.ceil(Math.random() * board.blockVariation);
        this.reserveGrid[i][j];
      }
    }
  }

  boardToString() {
    let str = '';

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols - 1; j++) {
       str += this.grid[i][j] + ' - ';
      }

      str += this.grid[i][this.cols - 1];
      str += '\n';
    }
    console.log(str);
  }
}
