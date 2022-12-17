
//Sketch One
var a = function(p){

let angle = 0;

//random colour
let counter = 0
let colour;


p.setup = function(){
  p.createCanvas(800, 600);
  p.rectMode(CENTER);
  
    //Set myColour to be a random colour:
  p.colour = color(random(255), random(255), random(255));
}


p.draw = function() {
  p.background(50);
  angle += radians(1.5);
  
  for (let a=0; a<radians(360); a+=radians(30)) {
    p.push();
    p.translate(width/2, height/2);   
    p.rotate(a);                      
    p.translate(0, 200);              
    p.rotate(-angle); // moves circles                
   
    //Circle proterties
  
    p.fill(colour)
    p.circle(40, 40, 30);
    p.pop();
    
  //when the counter reaches 50,  
  if (counter > 1000) {
    //switch the colour to a new random colour:
    p.colour = color(random(255), random(255), random(255));

    //and reset the counter to zero:
    counter = 0;
  }


  //At the end of each frame increase the counter
  counter = counter + 1;
    
}
    
  }

var myp5 = new p5(a,'c1')

//Sketch Two
var b = function(p) {

var x,
start;

p.setup = function() {
  p.createCanvas(800, 400);
  start = millis();
  p.noStroke();
}

p.draw = function() {
  background(220);
  
  x = map(millis(), start, start+1000, 0 , width);
  p.rect(0, 0, x, 100);

    x = map(millis(), start, start+5500, 0 , width);
  p.rect(0,100, x, 100);
  x = map(millis(), start, start+7500, 0 , width);
  p.rect(0,200, x, 100);
  x = map(millis(), start, start+10000, 0 , width);
  p.rect(0,300, x, 100);
    p.fill(0,200,x);
}
 

}
var myp5 = new p5(b, 'c2');



var c = function(p) {
//Sketch Three

let floorL; //Position of left hand side of floor
let floorR; //moves of right hand side of floor


//Moves text
let position;
let velocity;
let r = 6;
let speed = 3;



p.setup = function() {
  p.createCanvas(800, 400);

  p.fill(25,25,25);
  floorL = createVector(250, height - 250);
  floorR = createVector(width, height);

  position = createVector(width / 2, 0);

  //calculate initial random velocity
  velocity = p5.Vector.random2D();
  velocity.mult(speed);
}

p.draw = function() {
  //draw background
  p.fill(50, 12,);
  p.noStroke();
  p.rect(0, 0, width, height);

  //draw base
  // fill(25,25,25);
  p.quad(floorL.x, floorL.y, floorR.x, floorR.y, floorR.x, height, 0, height);

  //calculate base top normal
  let baseDelta = p5.Vector.sub(floorR, floorL);
  baseDelta.normalize();
  let normal = createVector(-baseDelta.y, baseDelta.x);
  let intercept = p5.Vector.dot(floorL, normal);

  //draw Logo
  p.textSize(32); 
  p.fill(255);
  p.text('DVD', position.x, position.y, r * 7, r * 7);
 
  //move LOGO
  position.add(velocity);

  //normalized incidence vector
  incidence = p5.Vector.mult(velocity, -1);
  incidence.normalize();

  // detect and handle collision with base
  if (p5.Vector.dot(normal, position) > intercept) {
    //calculate dot product of incident vector and base top
    let dot = incidence.dot(normal);

    //calculate reflection vector
    //assign reflection vector to direction vector
    velocity.set(
      2 * normal.x * dot - incidence.x,
      2 * normal.y * dot - incidence.y,
      0
    );
    velocity.mult(speed);

    // draw base top normal at collision point
    p.stroke(255, 128, 0);
    p.line(
      position.x,
      position.y,
      position.x - normal.x * 100,
      position.y - normal.y * 100
    );
  }
  //}

  // detect boundary collision
  // right
  if (position.x > width - r) {
    position.x = width - r;
    velocity.x *= -1;
  }
  // left
  if (position.x < r) {
    position.x = r;
    velocity.x *= -1;
  }
  // top
  if (position.y < r) {
    position.y = r;
    velocity.y *= -1;

    //randomize base top
    floorL.y = random(height -30,height);
    floorR.y = random(height -30, height);
  }
}

var myp5 = new p5 (t, 'c3')