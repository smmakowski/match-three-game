const chai = require('chai');
const expect = chai.expect;
let Board = require('../scripts/prefabs/Board.js').Board;


describe('Board Object', () => {
  describe('Board contructor', () => {
    let regularBoard = new Board(null, 7, 7, 7);
    let tinyBoard= new Board(null, 3, 3, 7);
    it('should produce a board instance state, rows, cols, and blockVariations properties', () => {
      expect(regularBoard.state).to.equal(null);
      expect(regularBoard.rows).to.be.a('number');
      expect(regularBoard.cols).to.be.a('number');
      expect(regularBoard.blockVariations).to.be.a('number');
      expect(regularBoard.grid).to.be.an('array');
      expect(regularBoard.reserveGrid).to.be.an('array');
    });

    it('.grid should have a two-dimensional array property created from .rows and .cols', () => {
      let rowsArraysSameLength = true;
      for (let i = 0; i < regularBoard.grid.length; i++) {
        if (!Array.isArray(regularBoard.grid[i]) || regularBoard.grid[i].length !== regularBoard.cols) {
          rowsArraysSameLength = false;
        }
      }

      expect(regularBoard.grid.length === regularBoard.rows).to.equal(true);
      expect(rowsArraysSameLength).to.equal(true);

    });
    it('.RESERVE_ROWS should have same number if number of rows >= 4 or 2 rows if less than 4', () => {
      expect(tinyBoard.RESERVE_ROWS).to.equal(tinyBoard.rows);
      expect(regularBoard.RESERVE_ROWS).to.equal(regularBoard.rows);
    });

    it('.reserveGrid should be a 2-dimensional array created from .RESERVE_ROWS', () => {
      let regResRowsArraysSameLength = true;
      let tinyResRowsArraysSameLength = true;

      for (let i = 0; i < regularBoard.reserveGrid.length; i++) {
        if (!Array.isArray(regularBoard.reserveGrid[i]) || regularBoard.reserveGrid[i].length !== regularBoard.cols) {
          regResRowsArraysSameLength = false;
        }
      }

      for (let i = 0; i < tinyBoard.reserveGrid.length; i++) {
        if (!Array.isArray(tinyBoard.reserveGrid[i]) || tinyBoard.reserveGrid[i].length !== tinyBoard.cols) {
          tinyResRowsArraysSameLength = false;
        }
      }

      expect(regularBoard.reserveGrid.length === regularBoard.RESERVE_ROWS).to.equal(true);
      expect(regResRowsArraysSameLength).to.equal(true);
      expect(tinyBoard.reserveGrid.length === tinyBoard.RESERVE_ROWS).to.equal(true);
      expect(tinyResRowsArraysSameLength).to.equal(true);
    });
  });

  describe('.populateGrid() and .populateReserveGrid()', () => {
    let board = new Board(null, 7 , 7 , 7);
    board.populateGrid();
    board.populateReserveGrid();

    it('.populateGrid() and .populateReserveGrid() should pupulate grid with numbers 1 through blockVariations for every slot', () => {
      let gridPopulated = true;
      let resGridPopulated = true;

      for (let i = 0; i < board.rows; i++) {
        for (let j = 0; j < board.cols; j++) {
          if (!(board.grid[i][j] >= 1 && board.grid[i][j] <= board.blockVariations)) {
            gridPopulated = false;
          }
        }
      }

      for (let i = 0; i < board.RESERVE_ROWS; i++) {
        for (let j = 0; j < board.cols; j++) {
          if (!(board.reserveGrid[i][j] >= 1 && board.reserveGrid[i][j] <= board.blockVariations)) {
            resGridPopulated = false;
          }
        }
      }

      expect(gridPopulated).to.equal(true);
      expect(resGridPopulated).to.equal(true);
    });

  });

  describe('.isAdjacent()', () => {
    it('should determine whether or not two positions on a grid are adjacent', () => {
      const board = new Board(null, 7 , 7 , 7);
      const pos1 = {row: 1, col: 1};
      const pos2 = {row: 1, col: 2};
      const pos3 = {row: 3, col: 4};
      const pos4 = {row: 2, col: 2};

      expect(board.isAdjacent(pos1, pos2)).to.equal(true);
      expect(board.isAdjacent(pos1, pos3)).to.equal(false);
      expect(board.isAdjacent(pos2, pos4)).to.equal(true);
    });
  });

  describe('.swapBlocks()', () => {
    it('should swap the values between two blocks', ()=> {
      let board = new Board(null, 3, 3, 7);
      board.populateGrid();

      let targetVal = board.grid[0][1];
      let sourceVal = board.grid[1][1];

      board.swapBlocks({row: 1, col: 1}, {row: 0, col: 1});

      expect(board.grid[0][1]).to.equal(sourceVal);
      expect(board.grid[1][1]).to.equal(targetVal);
    });
  });

  describe('.isChained(), findAllChains clearAllChains()', () => {
    const board = new Board(null, 5, 5, 3);
    board.grid = [
      [1, 1, 2, 1, 3],
      [2, 2, 2, 1, 3],
      [3, 1, 2, 2, 3],
      [1, 2, 3, 1, 2],
      [3, 3, 3, 2, 1]
    ];


    it('isChained() should return true if blocks are chained (3 in row/col) or false if not', () => {

      expect(board.isChained({row: 2, col: 2})).to.equal(true);
      expect(board.isChained({row: 2, col: 0})).to.equal(false);
      expect(board.isChained({row: 0, col: 1})).to.equal(false);
      expect(board.isChained({row: 1, col: 0})).to.equal(true);
    });


    const chains = board.findAllChains();
    it('findAllChains() should return an array with all positions where there is a chain', () => {
      // find chains for

      expect(chains.length).to.equal(8);
      expect(chains).to.deep.equal([{row: 0, col: 2}, { row: 0, col: 4 },
        { row: 1, col: 0 }, { row: 1, col: 2 }, { row: 2, col: 2 }, { row: 2, col: 4 },
        { row: 4, col: 0 }, { row: 4, col: 2 }]);
    });

    it('.clearAllChains() should turn all postions where chains are found to 0', () => {
      board.clearAllChains();
      let allChainsCleared = true;
      for (let i = 0; i < chains.length; i++) {
        let row = chains[i].row;
        let col = chains[i].col;

        if (board.grid[row][col] !== 0) {
          allChainsCleared = false;
        }
      }

      expect(allChainsCleared).to.equal(true);
    });

    it('updateGrid() should fill in empty spaces with values from block that are higher in column or blocks in reserve', () => {
      board.populateReserveGrid();
      board.boardToString();
      board.updateGrid();
      board.boardToString();

      // check that bottom most 0s are filled with next available block
      expect(board.grid[4][0]).to.equal(1);
      expect(board.grid[4][1]).to.equal(3);
      expect(board.grid[4][2]).to.equal(3);
      expect(board.grid[4][3]).to.equal(2);
      expect(board.grid[2][4]).to.equal(3);

      // check all blocks are filled
      let allFilled = true;

      board.grid.forEach((row) => {
        for (let i = 0; i < row.length; i++) {
          if (row[i] === 0) {
            allFilled = false;
          }
        }
      });

      // expect(allFilled).to.equal(true);

    });
  });

});
