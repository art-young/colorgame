var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function(){
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  numSquares = 3;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;

  for (var i = 0; i < squares.length; i++){
    if (colors[i]){
      squares[i].style.backgroundColor = colors[i];
    }
    else{
      squares[i].style.display = "none";
    }
  }

});

hardBtn.addEventListener("click", function(){
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
  numSquares = 6;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;

  for (var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.display = "block";
  }

});

resetButton.addEventListener("click", function(){
  // Generate all new colors
  colors = generateRandomColors(numSquares);
  // Pick a new random color from array
  pickedColor = pickColor();
  // Change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  // Change colors of squares
  for (var i = 0; i < squares.length; i++){
    // Change each color to match given color
    squares[i].style.backgroundColor = colors[i];
  }
  h1.style.backgroundColor = "steelblue";
  this.textContent = "New Colors";
});

colorDisplay.textContent = pickedColor;

// Loop through squares array and do stuff
for (var i = 0; i < squares.length; i++){
  // Add initial colors to squares
  squares[i].style.backgroundColor = colors[i];

  // Add click listener to squares
  squares[i].addEventListener("click", function(){
    // Get color of clicked square
    var clickedColor = this.style.backgroundColor;
    // Compare color to pickedColor
    console.log(clickedColor, pickedColor);
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


