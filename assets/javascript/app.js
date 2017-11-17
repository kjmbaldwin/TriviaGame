//create a timer that counts down on each questions
//when a question loads the timer starts
//when the user slects an answer dispaly correct or incorrect for 5 seconds, and add to the score
//after 5 seconds, load next question and restart timer
//if timer runs out display correct answer add to missed answer and move to next question
//at end of game, display correct and incorrect, give option to replay


//questions
//use an array to store the number or questions
//use objects to store questins and answer
//


var questionArr = [
  {question: 'What is Superman\'s real name?',
  answer1: "Jor-El",
  answer2: "Kal-El",
  answer3: "Kara Zor-El",
  answer4: "Zod",
  correct: "a2"},
  {question: 'Where were Batman\'s parents killed?',
  answer1: "They're still alive",
  answer2: "Joker's hideout",
  answer3: "Crime Alley",
  answer4: "Broadway Ave",
  correct: "a3"},
  {question: 'Who told Spiderman that "With great power, comes great responsibility"?',
  answer1: "Uncle Ben",
  answer2: "Aunt May",
  answer3: "Uncle John",
  answer4: "JJ Jameson",
  correct: "a1"},
  {question: 'What is the source of The Flash\'s speed?',
  answer1: "Quicksilver",
  answer2: "The Sun ",
  answer3: "A balanced diet",
  answer4: "The Speed Force",
  correct: "a4"},
  {question: 'What is Thor\'s home planet?',
  answer1: "Krypton",
  answer2: "Asgard",
  answer3: "Oa",
  answer4: "Earth",
  correct: "a2"},
  {question: 'What kind or Martian is The Martian Manhunter?',
  answer1: "White Martian",
  answer2: "American",
  answer3: "Red Martian",
  answer4: "Green Martian",
  correct: "a4"},  
  {question: 'What gave Captain America his powers?',
  answer1: "The Lazarus Pit",
  answer2: "Super Strength Potion",
  answer3: "Super Soldier Serum",
  answer4: "A great exercise routine",
  correct: "a3"},
  ]




var seconds = 30;
var rightAnswer = 0;
var wrongAnswer = 0;
var currentQuestion = 0;
var interval;


function countDown(){
  $('#timer').text('Time left: 30');
  interval = setInterval(function(){
    seconds--;
    $('#timer').text('Time left: ' + seconds);
    
    if (seconds === 0){
      $('#banner').text('Time\'s Up');
      nextQuestion();
    }
  }, 1000) 
}

function question(){

  $('#banner, .score').empty();

  if(currentQuestion == questionArr.length){
    score();
  }

  else{    
    $('#question').text($(questionArr[currentQuestion]).attr('question'));
    $('#a1').text($(questionArr[currentQuestion]).attr('answer1'));
    $('#a2').text($(questionArr[currentQuestion]).attr('answer2'));
    $('#a3').text($(questionArr[currentQuestion]).attr('answer3'));
    $('#a4').text($(questionArr[currentQuestion]).attr('answer4'));
    var cor = $(questionArr[currentQuestion]).attr('correct');
    $('#' + cor).removeClass('answer').addClass('correct');
    countDown();
    currentQuestion++;
  } 
};

function nextQuestion(){
  $('.correct').removeClass('correct').addClass('answer');
  $('#question, .answer, #timer').empty();
  clearInterval(interval);
  seconds = 30;
  setTimeout(question,5000);
};

function score(){
  $('#banner').text('Way to go, you got to the end!');
  var score = $('<div>');
  score.addClass('score');
  score.append('<p>You correctly answered: '+ rightAnswer +'</p>');
  score.append('<p>You missed: '+ wrongAnswer +'</p>');
  score.append('<div id="restart">Click here to try again</div>');
  $('.game-board').append(score);
};


$('#banner').click(question);

$(document).on('click', '.correct', function(){ 
  $('#banner').text('Correct! Good Guess!');
  rightAnswer++;
  nextQuestion();
});

$(document).on('click', '.answer', function(){
  $('#banner').text('NOOOOPE!');
  wrongAnswer++;
  nextQuestion();
});

$(document).on('click', '#restart', function(){ 
  currentQuestion = 0;
  question();
});