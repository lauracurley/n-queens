/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme
  var solution = [];
  for (var col = 0; col < n; col++) {
    var temp = [];
    for (var row = 0; row < n; row++) {
      temp.push(0);
    }
    solution.push(temp);
  }

  var row = 0;
  for (var col = 0; col < n; col++) {
    solution[row][col] = 1;
    if (row === n) {
      break;
    } else {
      row++;
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var a = 3;

  var solutionCount = function(n) {
    if (n === 0) {
      return 1;
    } 
    return n * solutionCount(n - 1);
  };


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount(n);
};
// n = 1 -> return 1
// n = 2 -> return 2
// n = 3 -> return 6






// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = 0;


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var currentlyPlaced = [];
  var b = new Board({n: n});
  var lastQueen;

  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else if (n <= 3) {
    return 0;
  }

  for (var c = 0; c < n; c++) {
    for (var r = 0; r < n; r++) {

      b.togglePiece(r, c);
      if (!b.hasAnyQueenConflictsOn(r, c)) {
        currentlyPlaced.push([r, c]);

        if (currentlyPlaced.length === n) {
          solutionCount++;
        }

        r = n;
      } else {
        b.togglePiece(r, c);
      }

      if (r + 1 === n && currentlyPlaced.length < c + 1) {
        lastQueen = currentlyPlaced.pop();
        r = lastQueen[0] + 1;
        c = lastQueen[1];
      }

    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
