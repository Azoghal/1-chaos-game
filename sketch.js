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
let shapeNames = [
	"void",
	"Point",
	"Line",
	"Triangle",
	"Square",
	"Pentagon",
	"Hexagon",
	"Heptagon",
	"Octagon",
	"Nonagon",
	"Decagon",
	"Hendecagon",
	"Dodecagon"]
let gameName;

let presets;
let currentPresetIndex;

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

	presets = [
		sierpinski(g),
		ngon(g, 5),
		ngon(g, 6),
		ngon(g, 7),
		ngon(g, 8),
		ngon(g, 9),
		ngon(g, 10),
		ngonNoRepeat(g, 5),
		squareNoRepeat(g, 40),
		overshoot(g,5,1.4,130),
		overshoot(g,5,1.6,60),
		overshoot1Point(g,5,2,1),
	]

	gameName = ""
	chaosGame = presets[0]
	currentPresetIndex = 0
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
		nextPreset();
	} else if (keyCode === LEFT_ARROW){
		refresh = true
		previousPreset();
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

function nextPreset(){
	currentPresetIndex += 1
	if (currentPresetIndex >= presets.length){
		currentPresetIndex = 0;
	}
	chaosGame = presets[currentPresetIndex]
	console.log(currentPresetIndex);
}


function previousPreset(){
	currentPresetIndex -= 1
	if (currentPresetIndex <= 0){
		currentPresetIndex = presets.length-1;
	}
	chaosGame = presets[currentPresetIndex]
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
  	text(chaosGame.name, width/2, textY);
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
function sierpinski(g) {
	const gName = "Classic chaos game. Triangle. Step halfway. Random sample."
	return new ChaosGame(g, gName, triangleAnchors(), randomSample, halfway, createVector(width / 2, height / 2), 40, [renderTransparent(40)]);
}

function ngon(g, n) {
	const stepSize = perfectRatio(n);
	const gName = `${shapeNames[n]}. Perfect packing step (${stepSize}). Random sample.`
	return new ChaosGame(g, gName, nGonAnchors(n), randomSample, perfectAction(n), createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}


function ngonNoRepeat(g, n) {
	const gName = `${shapeNames[n]}. Step halfway. Can't pick same vertex consecutively`
	return new ChaosGame(g, gName, nGonAnchors(n), randomSampleNotSameTwice(), halfway, createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

function squareNoRepeat(g, padding) {
	const gName = `${shapeNames[4]}. Step halfway. Can't pick same vertex consecutively`
	return new ChaosGame(g, gName, squareAnchors(padding), randomSampleNotSameTwice(), halfway, createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

function overshoot(g, n, r, radius) {
	const gName = `${shapeNames[n]}. Step past point (${r}). Random sample.`
	return new ChaosGame(g, gName, nGonAnchorsRadius(n,radius), randomSample, ratioAction(r), createVector(width / 2, height / 2), 40, [renderTransparent(40)]);
}

function overshoot1Point(g, n, r, radius) {
	const gName = `${shapeNames[n]}. Step past point (${r}). Random sample.`
	return new ChaosGame(g, gName, nGonAnchorsRadius(n,radius), randomSample, ratioAction(r), createVector(width / 2, height / 2), 1, [renderTransparent(40)]);
}