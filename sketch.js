let chaosGame;
let justOnce;
let MAX_REJECTIONS=100;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES)
  justOnce = true;
  // chaosGame = sierpinski();
  // chaosGame = overshoot(5,1.4);
  chaosGame = ngonNoRepeat(5)
}

// calculates the perfect packing ratio for regular polygons
function perfectRatio(n){
  angleMode(RADIANS)
  let r = n%4;
  let ratio
  switch (r) {
    case 0:
      ratio = 1 / (1 + tan(PI/n));
      break;
    case 1:
    case 3:
      ratio = 1 / (1 + 2*sin(PI/(2*n)));
      break;
    case 2:
      ratio = 1 / (1 + sin(PI/n));
      break;
    default:
      throw exception("frank") 
  }
  angleMode(DEGREES)
  return ratio
}

// sierpinski triangle
function sierpinski(){
  return new ChaosGame(triangleAnchors(),randomSample,halfway, createVector(width/2,height/2), 40, [renderTransparent(40)]);
}

function ngon(n){
  return new ChaosGame(nGonAnchors(n), randomSample, perfectAction(n), createVector(width/2, height/2),10, [renderTransparent(40)]);
}
  
  
function ngonNoRepeat(n){
  return new ChaosGame(nGonAnchors(n), randomSampleNotSameTwice(), halfway, createVector(width/2, height/2),10, [renderTransparent(40)]);
}

function overshoot(n, r){
  return new ChaosGame(nGonAnchors(n), randomSample2, ratioAction(r), createVector(width/2, height/2),40, [renderTransparent(40)]);
}

function draw() {
  if (justOnce){
    background(220);
    chaosGame.drawAnchors();
    justOnce = false;
  }
  update();
}

function update() {
  chaosGame.step();
}

// anchor sets we can choose from
// these can actually be functions of width and height

// just one point
function onePoint(){
  return [createVector(width-10, height-10)];
}

function triangleAnchors(){
  let padding = 50;
  let vert = height - 2 * padding;
  let top = createVector(width/2, padding);
  let bottom = height - padding;
  let bottom_left = createVector((width/2)-(vert / tan(60)), bottom);
  let bottom_right = createVector((width/2)+(vert / tan(60)), bottom);
  return [bottom_left, top, bottom_right];
}

function nGonAnchors(n){
  let startAtTop = (n%2)==1;
  let startAngle = startAtTop? -90:0;
  let angle = 360/n;
  let center = createVector(width/2, height/2);
  let padding = 50;
  let radius = (width/2)-50;
  var anchors = []
  
  for (i=0;i<n;i++){
      anchors.push(createVector(center.x + radius * cos(startAngle + i*angle),center.y + radius * sin(startAngle + i*angle)));
  }
  
  return anchors;
}

// samplers
function first(array){
  if (array.length == 0) {
      throw exception("oh no")   
  }
  return array[0]
}

function randomSample(array) {
  let choices = array.length;
  if (array.length == 0) {
    throw execption("oh no");
  } 
  return random(array);
}

function randomSampleNotSameTwice(){
  let inner = randomSampleWithRejectionRules([rejectSameTwice]);
  console.log("inner",inner);
  return inner;
}

// rejectionRules is an array of functions that return true if the rule is met - i.e. the choice must be disregarded.
function randomSampleWithRejectionRules(rejectionRules) {

  let sampler = function(array,history) {
    let choices = array.length;
    if (array.length < 0) {
      throw "oh no";
    }
    let choice;
    let retryCount = 0;
    while (retryCount < MAX_REJECTIONS){
      choice = random(array);
      const rejections = rejectionRules.map((f)=>f(choice, history));
      let rejected = !rejections.every((x)=>x==false);
      if (!rejected){
        break;
      }
      retryCount++;
    }
    return choice
  }
  return sampler
}

// rejectionRules
function rejectSameTwice(choice,history){
  if (history.length < 2) {
    throw new Error("history is empty")
  }
  last = history[1];
  return choice==last;
}

function rejectSameAsPenultimate(choice,history){
  if (history.length < 1) {
    throw new Error("history is empty")
  }
  penum = history[0];
  return choice==penum;
}

function reject(choice, history){
  return true
}


// actions. Make sure we pass these copied vals.
function halfway(pos, target) {
  return pos.add((target.sub(pos)).mult(0.5));
}

function thirdways(pos, target) {
    return pos.add((target.sub(pos)).div(3));
}

function perfectAction(n){
  ratio = perfectRatio(n)
  return ratioAction(ratio);
}

function ratioAction(ratio){
  return function(pos, target){
    return pos.add((target.sub(pos)).mult(ratio));
  }
}

// render_setups

function renderTransparent(v){
  return function(){
    stroke(0,0,0,v);
    strokeWeight(1);  
  }
}

function renderOpaque(){
  stroke(0);
  strokeWeight(1);
}
