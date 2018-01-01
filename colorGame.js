var numSquares = 6;
var colors = [];
var pickedColor = pickColor();
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

// Initialize game board
function init(){
  setupModeButtons();
  setupSquares();
  setupResetButton();
  reset();
}

// Add click event listeners for mode buttons to modify game board based on selected mode
function setupModeButtons(){
  for (var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      // On clicking any mode buttons, remove selected class from all of them and 
      // then re-add selected class only on "this" button that was clicked
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy")
        numSquares = 3;
      else if (this.textContent === "Intermediate")
        numSquares = 6;
      else
        numSquares = 9;
      reset();
    });
  }
}

// Add click event listeners for all squares which contain game logic
function setupSquares(){
  for (var i = 0; i < squares.length; i++){
    // Add click listener to squares
    squares[i].addEventListener("click", function(){
      // Get color of clicked square
      var clickedColor = this.style.backgroundColor;
      // Compare color to pickedColor
      if (clickedColor === pickedColor){
        // TODO: modify message based on how many tries it took to guess
        messageDisplay.textContent = "Correct!"
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Wrong! Try Again!";
      }
    });
  }
}

// Add click event listener for reset button
function setupResetButton(){
  resetButton.addEventListener("click", function(){
    reset();
  });
}

// Reset the game board
function reset(){
  // Generate all new colors
  colors = generateRandomColors(numSquares);
  // Pick a new random color from array
  pickedColor = pickColor();
  // Change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  // Change colors of squares
  for (var i = 0; i < squares.length; i++){
    // Hide or show squares if value exists at this index in colors array
    if (colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }
    else {
      squares[i].style.display = "none";
    }
    squares[i].style.backgroundColor = colors[i];
  }
  h1.style.backgroundColor = "steelblue";
}

// Changes every square to given color
function changeColors(color){
  // Loop through all squares
  for (var i = 0; i < squares.length; i++){
    // Change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

// Generate random number between 0 and number of colors
// Return the color at that index in the colors array
function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Takes an argument for the length of the array
// Returns an array with randomly generated RGB colors
function generateRandomColors(num){
  var arr = [];
  // Add num random colors to array
  for (var i = 0; i < num; i++){
    // Get random color and push into array
    arr.push(randomColor());
  }
  return arr;
}

// Return a single random color
function randomColor(){
  // Pick a "red" from 0 - 255
  var r = Math.floor(Math.random() * 256);
  // Pick a "green" from 0 - 255
  var g = Math.floor(Math.random() * 256);
  // Pick a "blue" from 0 - 255
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}