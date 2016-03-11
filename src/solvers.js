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
  var solutionArray = [];
  var currentlyPlaced = [];
  var b = new Board({n: n});
  var lastQueen;
  var r = 0;
  var c = 0;
  var start = false;
  // debugger;
  console.log(n);

  if (n === 0) {
    return 1;
  } else if (n === 1) {
    return 1;
  } else if (n <= 3) {
    return 0;
  }

  while (c < n) {
    if (start === true) {
      // console.log(lastQueen);
      // c = lastQueen[1];
    }    

    //LOOP 2///////////////////
    r = 0;
    while (r < n) {
      if (start === true) {
        r = lastQueen[0] + 1;

        if (r === n) { //check if row index is out of bounds
          console.log('row: ', r, 'col: ', c);
          console.log(currentlyPlaced);
          if (currentlyPlaced.length !== 0) {//could have effed up here
            lastQueen = currentlyPlaced.pop();
            b.togglePiece(lastQueen[0], lastQueen[1]);
            r = lastQueen[0] + 1;
            c = lastQueen[1];
            
          } else {
            // return solutionArray.push(solutionCount);
            return solutionCount;
            
          }
        }
      }

      start = false;
      // console.log('row: ', r, 'col: ', c);
      if (start === false) {
        b.togglePiece(r, c);
        if (!b.hasAnyQueenConflictsOn(r, c)) { //if no conflicts, do this.
          currentlyPlaced.push([r, c]);
          console.log('placed queen! move to next col');

          if (currentlyPlaced.length === n) {
            // debugger;
            console.log('Found solution!');
            solutionCount++;
            currentlyPlaced.pop();
            b.togglePiece(r, c);
            // solution was found, do same thing as if none was found
          } else {
            r = n; //if no conflicts, then skip to next column
          }

        } else { //if has conflicts, do this:
          b.togglePiece(r, c);
        }

        if (r + 1 === n && currentlyPlaced.length < c + 1) {
          console.log('End of a blank column!');
          lastQueen = currentlyPlaced.pop();
          b.togglePiece(lastQueen[0], lastQueen[1]);
          console.log('Last Queen: ', lastQueen[0], ' , ', lastQueen[1]);
          start = true;
        }

        r++;
      }

    }//////////////////////////////
    if (start === true) {
      c = lastQueen[1];
    } else {
      c++;
    }
  }


  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
  // return solutionArray;
};

console.log('# of Solutions for 4 Queens: ' + countNQueensSolutions(4));


