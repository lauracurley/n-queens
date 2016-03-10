// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      var ones = 0; //keep track of how many ones there are on the row. 
      var currRowArr = this.rows()[rowIndex];
      _.each(currRowArr, function(value) {
        if (value === 1) {
          ones++;   
        }
      });
      return ones > 1 ? true : false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var result = false;
      var rowsArr = this.rows();
      var bound = this.hasRowConflictAt.bind(this); //REVIEW THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      _.each(rowsArr, function(value, index) {
        if (bound(index)) { //if (this.hasRowConflictAt(index)) doesn't work because lost binding to window.
          result = true;
        }
      });
      return result;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var ones = 0;
      var rowsArr = this.rows();
      _.each(rowsArr, function(value){
        if (value[colIndex] === 1){
          ones++;
        }
      });
      return ones>1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false;
      var numCols = this.rows().length;
      for (var i=0; i<numCols; i++){
        if (this.hasColConflictAt(i)){
          result = true;
        }
      }
      return result; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var ones = 0;
      var rowsArr = this.rows();

      // console.log(majorDiagonalColumnIndexAtFirstRow);
      // for (var i = majorDiagonalColumnIndexAtFirstRow; i < rowsArr.length; i++) {
      //   if (this.rows()[i][majorDiagonalColumnIndexAtFirstRow] === 1) {
      //     ones++;
      //   }
      // // }
      // for (var i = 1; i < rowsArr.length; i++) {
      //   if (this.rows()[i][majorDiagonalColumnIndexAtFirstRow + i] === 1) {
      //     ones++;
      //   }
      // }
      // for (var i = 0; i < rowsArr.length; i++) {
      //   for (var j = majorDiagonalColumnIndexAtFirstRow; j < rowsArr.length; j++) {


      //     if (rowsArr[i][j] !== undefined && rowsArr[i][j] === 1) {
      //       ones++;
      //       // console.log(i + ' ' + j);
      //     }
      //   }
      // }
      var rowIndex = 0;
      for (var i = majorDiagonalColumnIndexAtFirstRow; i < rowsArr.length; i++) {
        console.log(rowIndex + ' ' + i);
        console.log(rowsArr[rowIndex][i]);
        if (rowsArr[rowIndex][i] !== undefined) {
          if (rowsArr[rowIndex][i] === 1) {
            ones++;
          }
        }         
        rowIndex++;
        if (rowIndex === rowsArr.length) {
          break;
        } 
      }
      return ones > 1; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rowsArr = this.rows();
      var colsStartingIndex = -1 * rowsArr.length + 1;
      for (var i = colsStartingIndex; i < rowsArr.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

var board = new Board({n: 4});
board.togglePiece(1,0);
board.togglePiece(1,1);
board.togglePiece(0,1);
board.togglePiece(1,2);
// console.log(board.rows());
// console.log(board.hasColConflictAt(1));
console.log(board.rows());
// console.log(board.hasAnyRowConflicts());
// console.log(board.hasMajorDiagonalConflictAt(1));
console.log(board.hasAnyMajorDiagonalConflicts());
console.log('\n');


