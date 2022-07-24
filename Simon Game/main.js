//Variables and Arrays
var buttons = ["btn1", "btn2", "btn3", "btn4"];
var sequence = [];
var level = 0;
var userClickedPattern = [];

//clicking button mechanism;

$("button").on("click", function () {
  $(this).addClass("hover");
  userClickedPattern.push($(this).attr("id"));
  console.log(userClickedPattern);
  setTimeout(function () {
    $("button").removeClass("hover");
  }, 100);
  checkAnswer(userClickedPattern.length - 1);
  makeSound($(this).attr("id"));
});

//next sequence
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);
  var randomNum = Math.floor(Math.random() * 4);
  var rValue = buttons[randomNum];
  sequence.push(rValue);
  $("#" + rValue)
    .fadeOut(150)
    .fadeIn(150);
  makeSound(rValue);
}

//Detect Keyboard Input
$(document).on("keypress", function () {
  gameReset();

  setTimeout(function () {
    nextSequence();
  }, 200);
});

//sound effects

function makeSound(btn) {
  switch (btn) {
    case "btn1":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "btn2":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "btn3":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "btn4":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
  }
}

//checks users answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === sequence[currentLevel]) {
    if (userClickedPattern.length === sequence.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("gameOver");
    $("h1").text("Press A Key to Restart");
    $("h1").css("color", "#2C3639");
  }
}

function gameReset() {
  sequence = [];
  level = 0;
  userClickedPattern = [];
  $("body").removeClass("gameOver");
  $("h1").css("color", "gray").text("Press A Key To Start");
}
