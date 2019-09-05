// Declare starting variables
var theLeftSide = document.getElementById("leftSide");
var theRightSide = document.getElementById("rightSide");
var theBody = document.getElementsByTagName("body")[0];
var gameEnd = document.getElementById("gameEnd");
var deathScene = document.getElementById("deathScene");
var topText = document.getElementById("instructions1");
var bottomText = document.getElementById("instructions2");
var displayTimer = document.getElementById("tickTock");
var textContainer = document.getElementById("textContainer");
var numberOfJesses = 5;
var level = 1;
var score = 0;
var seconds = 10;

// Start the game
function generateFaces() {
  for (var i = 0; i < numberOfJesses; i++) {

    // Generate the images
    var jesse = document.createElement("img");
    jesse.src = "images/jesse.png";
    jesse.height = "100";

    // Create random values for top location
    randomTop = (Math.floor(Math.random() * 401)) + "px";
    jesse.style.top = randomTop;

    // Create random values for left location
    randomLeft = (Math.floor(Math.random() * 401)) + "px";
    jesse.style.left = randomLeft;

    // Place the images in the left side box
    theLeftSide.appendChild(jesse);
  }

  // Copy the left side into the right side
  var leftSideImages = theLeftSide.cloneNode(true);

  // Remove the last image
  leftSideImages.removeChild(leftSideImages.lastChild);

  // Place the images in the right side box
  theRightSide.appendChild(leftSideImages);

  // Select the last image on the left to be the correct choice
  theLeftSide.lastChild.onclick = function nextLevel(event) {
    event.stopPropagation();

    // Clear the board after the correct answer is selected
    while (theLeftSide.hasChildNodes()) {
      theLeftSide.removeChild(theLeftSide.firstChild);
    }
    while (theRightSide.hasChildNodes()) {
      theRightSide.removeChild(theRightSide.firstChild);
    }

    // Add 5 more images for the next level
    numberOfJesses += 5;

    // Start the next level
    generateFaces();

    // Keep track of level
    level++;

    // Keep track of current score, which are meaningless and arbitrarily large numbers
    score = Math.pow(level, 4) * Math.pow(8, level);
    currentScore();
  };

  // Reset the timer on correct answer
  seconds = 10;
}

// Game over if the user selects anything except for the correct answer
theBody.onclick = function gameOver() {

  // Circle the correct answer
  correctAnswer = theLeftSide.lastChild;
  correctAnswer.style.border = "3px";
  correctAnswer.style.borderStyle = "dashed";
  correctAnswer.style.borderColor = "red";
  correctAnswer.style.borderRadius = "50%";

  // Prevent future clicks from doing anything
  theBody.onclick = null;
  theLeftSide.lastChild.onclick = null;

  // Prevent the timer lose condition from triggering
  clearInterval(timer);

  // Change the instructional text to display the lose condition
  topText.innerHTML = "Incorrect! Game over!"
  bottomText.innerHTML = "";

  // Display the Game Over gif and create a link to restart the game
  var gameOver = document.createElement("img");
  gameOver.src = "images/gameover.gif";
  gameOver.onclick = function() {
    location.reload();
  };
  gameEnd.appendChild(gameOver);

  // Display the Death Scene gif
  var doom = document.createElement("img");
  doom.src = "images/jessedeath.gif";
  doom.id = "death";
  deathScene.appendChild(doom);
};

// Game over if the user doesn't choose the correct answer in the allotted time
var timer = setInterval(function() {
  if (seconds < 0) {
    clearInterval(timer);

    // Circle the correct answer
    correctAnswer = theLeftSide.lastChild;
    correctAnswer.style.border = "3px";
    correctAnswer.style.borderStyle = "dashed";
    correctAnswer.style.borderColor = "red";
    correctAnswer.style.borderRadius = "50%";

    // Prevent future clicks from doing anything
    theBody.onclick = null;
    theLeftSide.lastChild.onclick = null;

    // Change the instructional text to display the lose condition
    topText.innerHTML = "Too slow! Game over!";
    bottomText.innerHTML = "";

    // Display the Game Over gif and create a link to restart the game
    var gameOver = document.createElement("img");
    gameOver.src = "images/gameover.gif";
    gameOver.onclick = function() {
      location.reload();
    };
    gameEnd.appendChild(gameOver);

    // Display the Death Scene gif
    var doom = document.createElement("img");
    doom.src = "images/jessedeath.gif";
    doom.id = "death";
    deathScene.appendChild(doom);

  } else {
    displayTimer.innerHTML = "00:" + seconds.toString().padStart(2, '0');
    seconds--;
  }
}, 1000);

// Keep track of the current level
function currentLevel() {
  document.getElementById("header").innerHTML = "You're on Level: " + level;
}

// Keep track of the current score
function currentScore() {
  document.getElementById("score").innerHTML = "Current Score: " + score.toLocaleString();
}
