let chaosGame;
let refresh;
let darkMode;
let MAX_REJECTIONS = 100;
let showInstructions;
let showInstructionsBump;
let showAnchors;
let backgroundColour;
let foregroundColour;
let g;

function setup() {
	createCanvas(600, 600);
	angleMode(DEGREES)
	refresh = false;
	darkMode = true; // base this on time
	backgroundColour = color(0);
	foregroundColour = color(255);
	showInstructions = true;
	showAnchors = true;
	showInstructionsBump = true;
	g = createGraphics(width,height);
	// chaosGame = sierpinski();
	// chaosGame = overshoot(5,1.4);
	chaosGame = ngonNoRepeat(g, 5)
	// chaosGame = ngon(6);
}


function draw() {
	background(backgroundColour);
	if (refresh) {
		chaosGame.refresh();
		refresh = false;
	}
	update();
	
	image(g, 0,0)
	if (showAnchors){
		chaosGame.drawAnchors()
	}
	if (showInstructions){
		title();
		instructions();
	}
}


function update() {
	chaosGame.step();
}

function keyPressed(){
	if (keyCode === RIGHT_ARROW){
		refresh = true
		console.log("go to next!")
	} else if (keyCode === LEFT_ARROW){
		refresh = true
		console.log("go to previous!")
	}

	if (key==='r') {
		refresh = true
	} else if (key == 'h'){
		showInstructions = !showInstructions
	} else if (key == 'a'){
		showAnchors = !showAnchors
	} else if (key == 't'){
		darkMode = !darkMode
		setBackgroundColour(darkMode)
		chaosGame.invertColour();
	}
}

function setBackgroundColour(darkmode) {
	if (darkmode){
		backgroundColour = color(0);
		foregroundColour = color(255);
	} else {
		backgroundColour = color(255);
		foregroundColour = color(0);
	}
}

function title(){
	const textY = 0 + 20
	fill(foregroundColour)
	noStroke()
	textSize(10);
	textAlign(CENTER);
  	text("Pentagon. Step halfway. Can't pick same vertex consecutively", width/2, textY);
}

function instructions(){
	const textY = height - 20;
	fill(foregroundColour)
	noStroke()
	textSize(10);
	textAlign(CENTER);
  	text("<LEFT> Previous  <R> Refresh  <T> Toggle Light/Dark  <H> Hide  <A> Hide Anchors  <RIGHT> Next", width/2, textY);
}

// sierpinski triangle
function sierpinski() {
	return new ChaosGame(triangleAnchors(), randomSample, halfway, createVector(width / 2, height / 2), 40, [renderTransparent(40)]);
}

function ngon(n) {
	return new ChaosGame(nGonAnchors(n), randomSample, perfectAction(n), createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}


function ngonNoRepeat(g, n) {
	return new ChaosGame(g, nGonAnchors(n), randomSampleNotSameTwice(), halfway, createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

function overshoot(n, r) {
	return new ChaosGame(nGonAnchors(n), randomSample2, ratioAction(r), createVector(width / 2, height / 2), 40, [renderTransparent(40)]);
}



