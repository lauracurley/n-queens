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
  // keep track of rook count
  var count = 0;
  // for each row[col]
  console.log("!!!!!!!!!!THIS: ");
  console.log(this);

  // var b = new Board({n: 4});
  // console.log(b.hasAnyRowConflicts());
  // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');


  // for (var col = 0; col < n; i++) {
  //   for (var row = 0; row < n; i++) {
  //     if ( !this.hasAnyRowConflicts() && !this.hasAnyColConflicts() ) {
  //       count++;
  //     }
  //   }
  //   if (count === n) {
  //     solutionCount++;
  //   }
  // }
    // at each row/col
      // if there's no row conflict and no column conflict insert a 1
    // if the rook count === n
      // solutions++


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
// n = 1 -> return 1
// n = 2 -> return 2
// n = 3 -> return 6






// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
