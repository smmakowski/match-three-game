const chai = require('chai');
const expect = chai.expect;
let Board = require('../scripts/prefabs/Board.js').Board;


describe('Board Object', () => {
  let regularBoard = new Board(null, 7, 7, 7);
  let tinyBoard= new Board(null, 3, 3, 7);
  describe('Board contructor', () => {
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
    it('.RESERVE_ROWS should have two less rows if number of rows >= 4 or 2 rows if less than 4', () => {
      expect(tinyBoard.RESERVE_ROWS).to.equal(2);
      expect(regularBoard.RESERVE_ROWS).to.equal(5);
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

  xdescribe('Board Population', () => {

  });

  xdescribe('.isAdjacent()', () => {

  });

  xdescribe('swapBlocks', () => {

  });
});
