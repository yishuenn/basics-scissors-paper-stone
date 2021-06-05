// In production code, it's often helpful to store string constants
// in variables so that it's easier for a program to detect misspellings.
// E.g. if we used "scissors" everywhere and accidentally misspelled it
// in 1 place, our program may not detect that error until runtime,
// if at all. If we used the variable SCISSORS everywhere and misspelled
// it in 1 place, ESLint would help us detect that error before runtime.
// String constant variable names are usually all uppercase by convention.
// ---objects---
var SCISSORS = 'scissors';
var PAPER = 'paper';
var STONE = 'stone';
var REVERSED_SCISSORS = 'reversed scissors';
var REVERSED_PAPER = 'reversed paper';
var REVERSED_STONE = 'reversed stone';
// ---Possible modes---
var REGULAR = 'regular';
var REVERSED_SPS = 'reversed sps';
var KOREAN_SPS = 'korean sps';
// ---Misc---
var MODE_SELECTION_INSTRUCTIONS =
  'Please enter one of the following to choose a game mode:<br>1. ' +
  REGULAR +
  '<br>2. ' +
  REVERSED_SPS +
  '<br>3. ' +
  KOREAN_SPS;
var REPLAY_INSTRUCTIONS =
  'Now you can type "scissors" "paper" or "stone" to play another round!';

// Keep track of user's name to personalise the game.
var userName = '';

// Keep track of the current game mode ().
var mode = '';

// Initialise the number of player wins, computer wins, and draws to 0.
var numPlayerWins = 0;
var numComputerWins = 0;
var numDraws = 0;

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
  if (mode == REGULAR || mode == KOREAN_SPS) {
    (playerObject == SCISSORS && computerObject == PAPER) ||
      (playerObject == PAPER && computerObject == STONE) ||
      (playerObject == STONE && computerObject == SCISSORS);
  }
  if (mode == REVERSED_SPS) {
    return (
      (playerObject == REVERSED_SCISSORS && computerObject == STONE) ||
      (playerObject == REVERSED_PAPER && computerObject == SCISSORS) ||
      (playerObject == REVERSED_STONE && computerObject == PAPER)
    );
  }
};

// Set a fn that will return an icon based on a  given object
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
 * Return standard string representing player's and computer's win-loss records
 */
var getDefaultWinLossMessage = function () {
  return (
    '<br>' +
    userName +
    ': ' +
    numPlayerWins +
    ' | Computer: ' +
    numComputerWins +
    ' | Draws: ' +
    numDraws
  );
};

/**
 * Check whether player draws with computer objects
 * @param {*} playerObject
 * @param {*} computerObject
 */
var doesPlayerDrawWComputer = function (playerObject, computerObject) {
  if (mode == REGULAR || mode == KOREAN_SPS) {
    return playerObject == computerObject;
  }
  if (mode == REVERSED_SPS) {
    return (
      (playerObject == REVERSED_SCISSORS && computerObject == SCISSORS) ||
      (playerObject == REVERSED_PAPER && computerObject == PAPER) ||
      (playerObject == REVERSED_STONE && computerObject == STONE)
    );
  }
};

/**
 * Check whether player's inputs are valid
 * @param {*} userInput
 */
var validateInput = function (userInput) {
  // validate the input according to the SPS game
  if (mode == REGULAR || mode == KOREAN_SPS) {
    return userInput == SCISSORS || userInput == PAPER || userInput == STONE;
  }
  // validate the input according to reversed SPS game
  if (mode == REVERSED_SPS) {
    return (
      userInput == REVERSED_SCISSORS ||
      userInput == REVERSED_PAPER ||
      userInput == REVERSED_STONE
    );
  }
  // return false to show that input is invalid
  return false;
};

/**
 * Create a string message saying that the user's  input is invalid
 */
var createResponseForInvalidInput = function () {
  if (mode == REGULAR || mode == KOREAN_SPS) {
    return (
      'Please input 1 of ' +
      SCISSORS +
      ', ' +
      PAPER +
      ', or ' +
      STONE +
      ' to play the game.'
    );
  }
  if (mode == REVERSED_STONE) {
    return (
      'Please input 1 of ' +
      REVERSED_SCISSORS +
      ', ' +
      REVERSED_PAPER +
      ', or ' +
      REVERSED_STONE +
      ' to play the game.'
    );
  }
};

var createPlayingInstructions = function () {
  // if it is the reversed mode, prompt user to enter 'reversed scissors', 'reversed paper', ...
  if (mode == REVERSED_SPS) {
    return (
      'Thank you for playing, ' +
      userName +
      '! <br> To begin, enter "' +
      REVERSED_SCISSORS +
      '" "' +
      REVERSED_PAPER +
      '" or "' +
      REVERSED_STONE +
      '".'
    );
  }
  // if it is not the reversed mode, propmpt user to enter 'scissors', 'paper', or 'stone'
  return (
    'Thank you for playing, ' +
    userName +
    '! <br> To begin, enter "' +
    SCISSORS +
    '" "' +
    PAPER +
    '" or "' +
    STONE +
    '".'
  );
};

/**
 * Play SPS with user input, return game result.
 * @param {string} input - Player's object
 */
var main = function (input) {
  // If userName is not yet set, accept user's first input as userName, and
  // return an output that prompts the user to start playing SPS.
  if (!userName) {
    // If the user did not input anything, prompt them to enter something
    // as their user name.
    if (!input) {
      return 'Please input a non-empty string as your user name!';
    }
    userName = input;

    return 'Welcome, ' + userName + '!<br>' + MODE_SELECTION_INSTRUCTIONS;
  }
  // If game mode is not yet set, accept user's second input the mode, and
  // return an output that prompts the user to start playing SPS.

  console.log(`mode is:`);
  console.log(mode);
  if (!mode) {
    // If the user did not input anything, prompt them to enter a mode
    if (!input) {
      return MODE_SELECTION_INSTRUCTIONS;
    }
    console.log(`input is:`);
    console.log(input);
    mode = input;

    // display the instructions to the user depending on the chosen mode
    var playingInstructions = createPlayingInstructions();
    return playingInstructions;
  }

  // If userName and mode are populated, validate the input. What constitutes as valid will depend on what mode the user selected
  var inputIsValid = validateInput(input);

  if (inputIsValid == false) {
    return createResponseForInvalidInput();
  }

  // If input is valid, call it "playerObject" to make game logic clearer
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
    // Increment num draws in win-loss record
    numDraws += 1;
    // Use <br> to create new lines in HTML output.
    return (
      defaultObjectsMessage +
      "<br><br> It's a draw! <br><br> " +
      getDefaultWinLossMessage()
    );
  }

  // If not draw, check if player wins
  if (doesPlayerBeatComputer(playerObject, computerObject)) {
    // Increment num player wins in win-loss record
    numPlayerWins += 1;
    return (
      defaultObjectsMessage +
      '<br><br>' +
      userName +
      ' wins! <br><br>' +
      REPLAY_INSTRUCTIONS +
      '<br>' +
      getDefaultWinLossMessage()
    );
  }
  // If it's not a draw and player has not won, then computer wins.
  // Increment num computer wins in win-loss record
  numComputerWins += 1;
  return (
    defaultObjectsMessage +
    '<br><br> You lose! Bummer <br><br>' +
    REPLAY_INSTRUCTIONS +
    getDefaultWinLossMessage()
  );
};
