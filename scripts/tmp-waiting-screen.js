let vollkornBold;
function preload() {
  vollkornBold = loadFont('/media/fonts/Vollkorn/static/Vollkorn-Bold.ttf');
}

let squareRotation = 0;
let starRotation = 0;
let baseMouseVec;
let smallLayoutThreshold = 680;
let titleText;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120, 60);
  
  baseMouseVec = createVector(windowWidth/2, windowHeight/2);
  
  // localizes text by checking if the user's preferred language matches an available one, otherwise fall back to english
  if (navigator.language == "de" || navigator.language == "de-DE") {
    titleText = "bitte warte, dinge passieren!";
  } else {
    titleText = "please wait, things are happening!";
  }
}

function draw() {
  clear();
  // background("#bdcb93");
  
  // interpolates the virtual mouse position with the actual mouse position over time, giving movement a more pleasing "delayed" effect
  baseMouseVec.set(lerp(baseMouseVec.x, mouseX, 0.05), lerp(baseMouseVec.y, mouseY, 0.05));
  let mouseVec = createVector((baseMouseVec.x * 2 - windowWidth) * 0.02, (baseMouseVec.y * 2 - windowHeight) * 0.02);
  
  // a parallax cursor-following effect is achieved by simply taking the mouse position, shifting the coordinates to the center for alignment, scaling it by varying amounts per "layer", and adding it to the position of each respective element. oh, and everything slowly rotates over time.
// the various if statements simply switch between slightly different positioning and scaling for smaller layouts
  push();

  squareRotation += PI * 0.0008;
  
  if (windowWidth <= smallLayoutThreshold) {
    translate(width - 80 + mouseVec.x * 0.4, height/2 - 60 + mouseVec.y * 0.4);
  } else
  {
    translate(width/2 + 300 + mouseVec.x * 0.4, height/2 - 60 + mouseVec.y * 0.4);
  }
  rotate(squareRotation);
  fill("#a5c07e")
  noStroke();
  if (windowWidth <= smallLayoutThreshold) {square(-windowHeight/4/2, -windowHeight/4/2, windowHeight/4)} else {square(-140, -140, 280)}
  
  pop();
  
  // ----------------
  
  push();

  starRotation -= PI * 0.0008;
  
  if (windowWidth <= smallLayoutThreshold) {
    translate(40 + mouseVec.x * 0.6, height/2 + 80 + mouseVec.y * 0.6);
  } else
  {
    translate(width/2 - 300 + mouseVec.x * 0.6, height/2 + 80 + mouseVec.y * 0.6);
  }
  rotate(starRotation);
  fill("#a5c07e")
  noStroke();
  if (windowWidth <= smallLayoutThreshold) {squareStar(5, windowHeight/5, windowHeight/5/2)} else {squareStar(5, 200, 100)}
  
  pop();
  
  // ----------------

  translate(mouseVec);
  textAlign(CENTER);
  textFont(vollkornBold);
  fill("#3d8e2f");
  if (windowWidth <= smallLayoutThreshold)
  {
    textSize(42);
    text(titleText, width / 2 - 200, height / 2 - 21, 400);
  } else
  {
    textSize(48);
    text(titleText, width / 2, height / 2);
  }

}

function squareStar(points, radius, thickness) {
  let iter = 0;
  
  while (iter < points) {
    rotate(TAU / points);
    // draws a rectangle center-left aligned to the origin so the rotation creates a star shape!
    quad(0, -thickness/2, radius, -thickness/2, radius, thickness/2, 0, thickness/2);
    
    iter++;
  }
}