
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0; 


$(document).on("keypress",function(event){
  if(!started){
    console.log(event.key);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);


  checkAnswer(userClickedPattern.length-1); //============= step 2
});

function nextSequence() {
  userClickedPattern =[];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(() => {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {  
    console.log("okay");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 500);

    startOver();
    
  }
}


function startOver() {
  level = 0;
  gamePattern =[];
  started = false;
}