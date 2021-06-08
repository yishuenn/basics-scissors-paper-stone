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
// ---players---
var PLAYER = 'player';
var COMPUTER = 'computer';
// ---Outcomes---
var WIN = 'win';
var LOSE = 'lose';
var DRAW = 'draw';

// ---Possible modes---
var REGULAR = 'regular';
var REVERSED_SPS = 'reversed sps';
var KOREAN_SPS = 'korean sps';
var COM_V_COM = 'computer vs computer';
// ---Misc---
var MODE_SELECTION_INSTRUCTIONS =
  'Please enter one of the following to choose a game mode:<br>1. ' +
  REGULAR +
  '<br>2. ' +
  REVERSED_SPS +
  '<br>3. ' +
  KOREAN_SPS +
  '<br>4. ' +
  COM_V_COM;

// ---Modes for Korean SPS---
var attacker = null;
var COMPUTER = 'Computer';
var PLAYER = 'Player';

// Keep track of user's name to personalise the game.
var userName = '';

// Keep track of the current game mode.
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
  if (mode == REVERSED_SPS) {
    // determine if player wins in the reversed sps mode
    return (
      (playerObject == REVERSED_SCISSORS && computerObject == STONE) ||
      (playerObject == REVERSED_PAPER && computerObject == SCISSORS) ||
      (playerObject == REVERSED_STONE && computerObject == PAPER)
    );
  }
  // determine if player wins in non-reversed modes
  return (
    (playerObject == SCISSORS && computerObject == PAPER) ||
    (playerObject == PAPER && computerObject == STONE) ||
    (playerObject == STONE && computerObject == SCISSORS)
  );
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
 * @param {string} playerObject
 * @param {string} computerObject
 */
var doesPlayerDrawWComputer = function (playerObject, computerObject) {
  // determine draw conditions for 'reversed sps'. Return a boolean
  if (mode == REVERSED_SPS) {
    return (
      (playerObject == REVERSED_SCISSORS && computerObject == SCISSORS) ||
      (playerObject == REVERSED_PAPER && computerObject == PAPER) ||
      (playerObject == REVERSED_STONE && computerObject == STONE)
    );
  }
  // determine draw conditions for regular sps. Return a boolean
  return playerObject == computerObject;
};

/**
 * Check whether player's inputs are valid
 * @param {string} userInput
 */
var validateObjectInput = function (userInput) {
  //if user is playing reversed SPS, validate  input accordingly
  if (mode == REVERSED_SPS) {
    return (
      userInput == REVERSED_SCISSORS ||
      userInput == REVERSED_PAPER ||
      userInput == REVERSED_STONE
    );
  }
  // if use is playing regular SPS, validate input accordingly
  return userInput == SCISSORS || userInput == PAPER || userInput == STONE;
};

/**
 * Check whether player's input on the mode is valid
 */
var validateModeInput = function (userInput) {
  return (
    userInput == REGULAR ||
    userInput == REVERSED_SPS ||
    userInput == KOREAN_SPS ||
    userInput == COM_V_COM
  );
};

/**
 * Create a string message saying that the user's  input is invalid
 */
var createResponseForInvalidInput = function () {
  // if the mode is 'reversed sps', return the relevant instructions
  if (mode == REVERSED_SPS) {
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
  // return the instructions for regular sps
  return (
    'Please input 1 of ' +
    SCISSORS +
    ', ' +
    PAPER +
    ', or ' +
    STONE +
    ' to play the game.'
  );
};

/**
 *  Set a fn that returns the instructions for the relevant game
 */
var createPlayingInstructions = function () {
  var preamble =
    'Thank you for playing, ' + userName + '! <br> To begin, enter ';

  if (mode == COM_V_COM) {
    preamble =
      'Thank you for playing, ' +
      userName +
      '! <br> To begin, click submit to roll scissors, paper or stone ';
  }

  // if it is the reversed mode, prompt user to enter 'reversed scissors', 'reversed paper', ...
  if (mode == REVERSED_SPS) {
    return (
      preamble +
      REVERSED_SCISSORS +
      ', ' +
      REVERSED_PAPER +
      ', or ' +
      REVERSED_STONE +
      '.'
    );
  }
  // if it is not the reversed mode, propmpt user to enter 'scissors', 'paper', or 'stone'
  return preamble + SCISSORS + ', ' + PAPER + ', or ' + STONE + '.';
};

/*
 * Set a function that crafts an appropriate output message to display when each round of the game ends
 */
var createEndGameMsg = function (outcome, msgPreamble) {
  // create a string that describes the valid  scissors paper stone inputs
  var instructions =
    'Now you can type "scissors" "paper" or "stone" to play another round!';

  // if the mode is reversed SPS, reassign instructions to a string that describes range of valid inputs
  if (mode == REVERSED_PAPER) {
    instructions =
      'Now you can type "reversed scissors" "reversed paper" or "reversed stone" to play another round!';
  }
  if (mode == COM_V_COM) {
    instructions = 'Click submit to roll scissors paper or stone';
  }

  if (outcome == WIN) {
    return (
      msgPreamble +
      '<br><br>' +
      userName +
      ' wins! <br><br>' +
      instructions +
      '<br>' +
      getDefaultWinLossMessage()
    );
  }

  if (outcome == LOSE) {
    return (
      msgPreamble +
      '<br><br>' +
      userName +
      ' loses! Bummer <br><br>' +
      instructions +
      getDefaultWinLossMessage()
    );
  }

  if (outcome == DRAW) {
    return (
      msgPreamble +
      '<br><br>' +
      "It's a draw! <br><br>" +
      instructions +
      getDefaultWinLossMessage()
    );
  }
};

/*
 * set a function that resets the SPS game
 */
var resetSpsGame = function () {
  attacker = null;
};

/*
 * @param {string} input - Player's object
 * Play SPS with user input, return game result.
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

  if (!mode) {
    // If the user did not input anything, prompt them to enter a mode
    if (!input) {
      return MODE_SELECTION_INSTRUCTIONS;
    }
    //validate that user's input matches one of the mode
    var modeInputIsValid = validateModeInput(input);

    // If the user's input is invalid, return the mode selection instructions
    if (!modeInputIsValid) {
      return MODE_SELECTION_INSTRUCTIONS;
    }
    // if the user's input is valid, assign the input to  mode (global variable)
    mode = input;

    // display the instructions to the user depending on the chosen mode
    var playingInstructions = createPlayingInstructions();
    return playingInstructions;
  }

  // if player selected COM_V_COM get the user object and move on to finding the winner
  if (mode == COM_V_COM) {
    var playerObject = getRandomObject();
  } else {
    // If userName and mode are populated, validate the input (here, we execute a validation function that returns a boolean value (i.e. true or false), then we assign this boolean to the 'objectInputIsValid' variable). What constitutes as valid will depend on what mode the user selected
    var objectInputIsValid = validateObjectInput(input);
    // if the input for the object is invalid, return a message prompting user to choose from a range of objects
    if (objectInputIsValid == false) {
      return createResponseForInvalidInput();
    }

    // If input is valid, call it "playerObject" to make game logic clearer
    playerObject = input;
  }

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
    // If it's korean sps mode, declare player the winner if playerWonLastRound is true
    if (mode == KOREAN_SPS && (attacker == PLAYER || attacker == COMPUTER)) {
      // if we have alr established an attacker, then a draw causes the attacker to become the ultimate winner and end the game.
      // if attacker is player, output a message that player  has won
      if (attacker == PLAYER) {
        numPlayerWins += 1;
        // reset the SPS game
        resetSpsGame();
        return createEndGameMsg(WIN, defaultObjectsMessage);
        // return (
        //   defaultObjectsMessage +
        //   '<br><br>' +
        //   userName +
        //   ' wins! <br><br>' +
        //   REPLAY_INSTRUCTIONS +
        //   '<br>' +
        //   getDefaultWinLossMessage()
        // );
      }

      // if attacker is the computer, output a message that computer has won
      if (attacker == COMPUTER) {
        numComputerWins += 1;
        // reset the SPS game
        resetSpsGame();
        return createEndGameMsg(LOSE, defaultObjectsMessage);
        // return (
        //   defaultObjectsMessage +
        //   '<br><br> You lose! Bummer <br><br>' +
        //   REPLAY_INSTRUCTIONS +
        //   getDefaultWinLossMessage()
        // );
      }
      // else, if we have not established an attacker, don't do anything
    }
    // If it's a draw and we are not playing Korean SPS
    // Increment num draws in win-loss record
    numDraws += 1;
    return createEndGameMsg(DRAW, defaultObjectsMessage);

    // return (
    //   defaultObjectsMessage +
    //   "<br><br> It's a draw! <br><br> " +
    //   getDefaultWinLossMessage()
    // );
  }

  // If not draw, check if player wins
  if (doesPlayerBeatComputer(playerObject, computerObject)) {
    // if we are playing Korean sps, assign the SPS winner to be the attacker.
    if (mode == KOREAN_SPS) {
      attacker = PLAYER;
      return (
        defaultObjectsMessage +
        userName +
        ' is now the attacker. Throw scissors paper or stone again'
      );
    }
    // if we are not playing Korean sps, treat this like a regular  SPS win:
    // Increment num player wins in win-loss record
    numPlayerWins += 1;
    return createEndGameMsg(WIN, defaultObjectsMessage);
    // return (
    //   defaultObjectsMessage +
    //   '<br><br>' +
    //   userName +
    //   ' wins! <br><br>' +
    //   REPLAY_INSTRUCTIONS +
    //   '<br>' +
    //   getDefaultWinLossMessage()
    // );
  }

  // If it's not a draw and player has not won, then computer wins.
  // Increment num computer wins in win-loss record
  if (mode == KOREAN_SPS) {
    // make computer the attacker
    attacker = COMPUTER;
    return (
      defaultObjectsMessage +
      COMPUTER +
      ' is now the attacker. Throw scissors paper or stone again'
    );
  }

  numComputerWins += 1;
  return createEndGameMsg(LOSE, defaultObjectsMessage);

  // return (
  //   defaultObjectsMessage +
  //   '<br><br> You lose! Bummer <br><br>' +
  //   REPLAY_INSTRUCTIONS +
  //   getDefaultWinLossMessage()
  // );
};
