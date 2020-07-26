// alert("js loded");
var level = 0;
var started = false;
var gamePattern = [];
var gametoggle = false;
var userEnteredGamePattern = []
buttonColors = ["red", "blue", "green", "yellow"]

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3 + 1)
  var randomColorChooser = buttonColors[randomNumber];
  gamePattern.push(randomColorChooser);
  console.log(randomColorChooser);
  $("#" + randomColorChooser).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColorChooser);
  $("#level-title").text("Level " + level);

}
//nextSequece();

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").on("click", function() {
  var needed = $(this).attr("id")
  userEnteredGamePattern.push(needed);
  playSound(needed);
  animatePress(needed);
  checkAnswer(userEnteredGamePattern.length-1);
  //console.log(userEnteredGamePattern);
})

function checkAnswer(playerlength)
 {

  if (userEnteredGamePattern[playerlength] == gamePattern[playerlength]) {
    console.log("correct")
    if(userEnteredGamePattern.length===gamePattern.length)
    {
      setTimeout(function() {
        nextSequence();
      }, 1000)
      userEnteredGamePattern = []
    }


  } else {
    // console.log("wronng");
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function() {
       $("body").removeClass("game-over");
     },200)
   $("#level-title").text("Game Over Click To Restart");
   $("#level-title").on("click",function(){started=false;location.reload()})
  }
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}


// nextSequece();
// console.log(gamePattern)
