//Point system
playerwin = 0
playerloss = 0
playerdraw = 0

//Choices by user
var rock = 'rock';
var scissors = 'scissors';
var paper = 'paper';

///Fixing generation of 3 numbers & naming them to rock/scissors/paper
// Computer Generating random numbers from 0-2
  var computerinput = function(){
    var randomDecimal = Math.random()*3;
    var randomInteger = Math.floor (randomDecimal);  
    return randomInteger;
  }
// Naming Number to rock, scissors, papers
 var numbertoword = function () {
   var randomInteger = computerinput ();
   if (randomInteger == 0) {return rock};
   if (randomInteger == 1) {return scissors};
    if (randomInteger ==2) {return paper};
 }

//Default state
var currentGameMode = 'waiting for player'
var username = ''

var main = function (input) {
  var myOutputValue = '';

  if (currentGameMode == 'waiting for player'){
  // set username
  username = input;
  // Game mode been switched
  currentGameMode = 'Game started';
  console.log(currentGameMode);
  myOutputValue = 'Hello ' + input + ' Please enter rock / scissors / paper';
  console.log(myOutputValue);
  return myOutputValue;
  };

if (currentGameMode == 'Game started'){
  // Draw situation
  var computerchoice = numbertoword();
  console.log('player choose', input, 'computer choose', computerchoice);
    if (input == computerchoice) {
    playerdraw = playerdraw+1;
    myOutputValue = 'You drawed'};

  //Player wins
    if ((input ==scissors && computerchoice== paper) || (input == rock && computerchoice== scissors) || (input == paper && computerchoice == rock)) {
      playerwin = playerwin+1;
      myOutputValue = 'You win';
    }

  // Player lost
    if ((input ==paper && computerchoice== scissors) || (input == scissors && computerchoice== rock) || (input == rock && computerchoice == paper)) {
      playerlose = playerlose+1;
      myOutputValue = 'You lost'};

  //Error code
   if (input != rock && input != scissors && input != paper){
     myOutputValue = 'You have enter the incorrect input. Please enter rock / scissors / paper'
   }

};
  return ('Hey ' + username  + ' You have chosen ' + input + ' while' + ' The computer chose ' + computerchoice + '.' + '<br>' + myOutputValue + '<br><br>' + 'You have drawn ' +playerdraw + ' times ' + 'You have won ' + playerwin +' times' + ' You have lose ' + playerlose + ' times.');
  
};