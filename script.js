// In production code, it's often helpful to store string constants
// in variables so that it's easier for a program to detect misspellings.
// E.g. if we used "scissors" everywhere and accidentally misspelled it
// in 1 place, our program may not detect that error until runtime,
// if at all. If we used the variable SCISSORS everywhere and misspelled
// it in 1 place, ESLint would help us detect that error before runtime.
// String constant variable names are usually all uppercase by convention.
var SCISSORS = 'scissors';
var PAPER = 'paper';
var STONE = 'stone';
var REVERSED_SCISSORS = 'reversed scissors';
var REVERSED_PAPER = 'reversed paper';
var REVERSED_STONE = 'reversed stone';
var REPLAY_INSTRUCTIONS =
  'Now you can type "scissors" "paper" or "stone" to play another round!';

/**
 * Return "scissors", "paper", or "stone" based on a random number
 */
var getRandomObject = function () {
  var randomNum = Math.floor(Math.random() * 3);
  if (randomNum == 0) {
    return SCISSORS;
  }
  // No need "else if" because if the previous if conditional were true,
  // the function would have returned and would not reach here.
  if (randomNum == 1) {
    return PAPER;
  }
  // If randomNum is neither 0 nor 1, return STONE.
  return STONE;
};

/**
 * Return whether player beats computer at SPS
 * @param {string} playerObject
 * @param {string} computerObject
 */
var doesPlayerBeatComputer = function (playerObject, computerObject) {
  return (
    (playerObject == SCISSORS && computerObject == PAPER) ||
    (playerObject == PAPER && computerObject == STONE) ||
    (playerObject == STONE && computerObject == SCISSORS) ||
    (playerObject == REVERSED_SCISSORS && computerObject == STONE) ||
    (playerObject == REVERSED_PAPER && computerObject == SCISSORS) ||
    (playerObject == REVERSED_STONE && computerObject == PAPER)
  );
};

/**
 * Set a fn that will return an icon based on a  given object
 * @param {string} object
 */
var getObjectIcon = function (object) {
  if (object == SCISSORS || object == REVERSED_SCISSORS) return ' ✂️';
  if (object == PAPER || object == REVERSED_PAPER) return ' 🗒';
  if (object == STONE || object == REVERSED_STONE) return ' 🪨';
};

/**
 * Return standard string representing player's and computer's objects
 * @param {*} playerObject
 * @param {*} computerObject
 */
var getDefaultObjectsMessage = function (playerObject, computerObject) {
  var playerObjectIcon = getObjectIcon(playerObject);
  var computerObjectIcon = getObjectIcon(computerObject);
  return (
    'The computer chose ' +
    computerObject +
    computerObjectIcon +
    '<br><br>' +
    'You chose ' +
    playerObject +
    playerObjectIcon
  );
};

/**
 * Check whether player draws with computer
 * @param {string} playerObject
 * @param {string} computerObject
 */
var doesPlayerDrawWComputer = function (playerObject, computerObject) {
  return (
    playerObject == computerObject ||
    (playerObject == REVERSED_SCISSORS && computerObject == SCISSORS) ||
    (playerObject == REVERSED_PAPER && computerObject == PAPER) ||
    (playerObject == REVERSED_STONE && computerObject == STONE)
  );
};

/**
 * Play SPS with user input, return game result.
 * @param {string} input - Player's object (e.g. scissors, paper, stone)
 */
var main = function (input) {
  // Validate that input is one of scissors, paper, or stone
  if (
    input != SCISSORS &&
    input != PAPER &&
    input != STONE &&
    input != REVERSED_SCISSORS &&
    input != REVERSED_PAPER &&
    input != REVERSED_STONE
  ) {
    return 'Please input 1 of "scissors", "paper", or "stone" to play the game.';
    // Side enote: recall what "return" statements do? <--ans: it exits the current function and returns the values that are included in the return statement.
    // This implies that if the return statement in line 107 is triggered, the rest of the code (from line 109 onwards) won't be executed becos we would've exited from the function.
  }

  // Input is one of scissors, paper, or stone
  // Call input playerObject to make game logic clearer
  var playerObject = input;
  // Get computer's computer-generated object
  var computerObject = getRandomObject();
  // Get a default output message sharing what player's and computer's objects are
  var defaultObjectsMessage = getDefaultObjectsMessage(
    playerObject,
    computerObject
  );
  // Compare player's object with computer's object and output win status
  // If player and computer objects are the same, it's a draw.
  if (doesPlayerDrawWComputer(playerObject, computerObject)) {
    // Use <br> to create new lines in HTML output.
    return defaultObjectsMessage + "<br><br> It's a draw! <br><br> ";
  }

  // If not a draw, check if player wins
  if (doesPlayerBeatComputer(playerObject, computerObject)) {
    return (
      defaultObjectsMessage +
      '<br><br>' +
      ' You win! <br><br>' +
      REPLAY_INSTRUCTIONS +
      '<br>'
    );
  }
  // If we reach this part of the code, it implies that 1. it's not a draw, and 2. Player has not won; hence,  computer wins! (see note on line 106 if you're unclear why)
  // Let's handle the output for this scenario:
  // Increment num computer wins in win-loss record
  return (
    defaultObjectsMessage +
    '<br><br> You lose! Bummer <br><br>' +
    REPLAY_INSTRUCTIONS
  );
};
