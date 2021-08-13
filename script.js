//Default state
var currentGameMode = 'waiting for player'
var username = ''

//Choices by user
var rock = 'rock';
var scissors = 'scissors';
var paper = 'paper';

//Output from player's input
var outputfromplayer = function (input) {
  var playerinput = 'error'
  if (input == 'rock') {
    playerinput = rock;
  }
  if (input = 'scissors') {
    playerinput = scissors;
  }
  if (input = 'paper') {
    playerinput = paper;
  }
  return playerinput;
};

// Computer Generating random number from 0-2
  var computerinput = function(){
    var randomDecimal = Math.random()*3;
    var randomInteger = Math.floor (randomDecimal);  
   // Naming Number
    if (randomInteger == 0) {
      return rock;
    }
    if (randomInteger == 1) {
      return scissors;
    }
    if (randomInteger ==2) {
      return paper ;
    };
    myOutputValue = randomInteger
  
// Game rules: Player lose
var playerlosewhen = function (playerinput, computerinput){
  var playerlose = (playerinput == rock && computerinput == paper) || (playerinput == scissors && computerinput == rock) || (playerinput ==paper &&computerinput == scissors);
  console.log (playerlose);

  return playerlose;}

//Game rules: Player wins
var playerwinwhen = function (playerinput, computerinput){
  var playerwin = (computerinput == rock && playerinput == paper) || (computerinput == scissors && playerinput == rock) || (computerinput ==paper && playerinput == scissors);
  console.log (playerwin);

  return playerwin;}

// Game rules: Draw
var playerdrawwhen = function (playerinput, computerinput)
{var playerdraw = (computerinput == rock && playerinput == rock) || (computerinput == scissors && playerinput == scissors) || (computerinput ==paper && playerinput == paper);
  console.log (playerdraw);

  return playerdraw;}
  
  var main = function (input) {
  var myOutputValue = '';

  if (currentGameMode == 'waiting for player'){
    //set username
    username = input;
    // Game starting
    currentGameMode = 'Game started'
    console.log = (currentGameMode)
    myOutputValue = 'Hello' + username + 'Please choose rock, scissors or paper';
  }

 // else if (currentGameMode == 'Gamestarted') {
    // Playerinput
    var playinput = outputfromplayer (input)
    var computerinput = randomInteger(input)
  }
  return myOutputValue;
};