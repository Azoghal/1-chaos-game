let chaosGame;
let refresh;
let wipeScreen;
let darkMode;
let MAX_REJECTIONS = 100;
let showInstructions;
let showInstructionsBump;
let showAnchors;
let backgroundColour;
let foregroundColour;
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
	wipeScreen = false;
	darkMode = false; // base this on time
	backgroundColour = color(255);
	foregroundColour = color(0);
	showInstructions = true;
	showAnchors = true;
	showInstructionsBump = true;

	presets = [
		sierpinski(),
		vicsek(),
		menger(),
		ngon(5),
		ngon(6),
		ngon(7),
		ngon(8),
		ngon(9),
		ngon(10),
		ngonNoRepeat(4),
		ngonNoRepeat(5),
		ngonNotNeighbourIfLastTwoSame(4),
		ngonNotNeighbourIfLastTwoSame(5),
		ngonNotAntiClockwise(4),
		ngonNotOpposite(4),
		overshoot(5,1.4,130),
		overshoot(5,1.6,60),
		overshoot1Point(5,2,1),
		// fern()
		// TODO starfish
		// TODO fern
	]

	gameName = ""
	chaosGame = presets[0]
	currentPresetIndex = 0
}


function draw() {
	background(backgroundColour);
	if (wipeScreen){
		background(backgroundColour);
		wipeScreen = false;
	}
	if (refresh) {
		chaosGame.refresh();
		refresh = false;
	}
	update();
	
	image(chaosGame.g, 0,0)
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
		wipeScreen = true
		nextPreset();
	} else if (keyCode === LEFT_ARROW){
		wipeScreen = true
		previousPreset();
	}

	if (key==='r') {
		refresh = true
	} else if (key == 'h'){
		showInstructions = !showInstructions
	} else if (key == 'a'){
		showAnchors = !showAnchors
	} else if (key == 't'){
		darkMode = !darkMode;
		setBackgroundColour(darkMode);
		chaosGame.setDarkMode(darkMode);
	}
}

function nextPreset(){
	moveInPresets(1)
}

function previousPreset(){
	moveInPresets(-1)
}

function moveInPresets(offset){
	currentPresetIndex+=offset;
	if (currentPresetIndex >= presets.length){
		currentPresetIndex = 0;
	}
	if (currentPresetIndex < 0){
		currentPresetIndex = presets.length-1;
	}
	chaosGame = presets[currentPresetIndex]
	chaosGame.setDarkMode(darkMode)
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
function sierpinski() {
	const g = createGraphics(width,height);
	const gName = "Sierpisnki: Classic chaos game. Triangle. Step halfway. Random sample."
	return new ChaosGame(g, gName, triangleAnchors(), randomSample, halfway, createVector(width / 2, height / 2), 40, [renderTransparent(40)]);
}

function menger(){
	const g = createGraphics(width,height);
	const gName = `Menger: Square + midpoint anchors. 2/3 step. Random sample.`
	return new ChaosGame(g, gName, squareWithMidpointAnchors(40), randomSample, ratioAction(2/3), createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

function vicsek(){
	const g = createGraphics(width,height);
	const gName = `Vicsek: Square + centre anchor. 2/3 step. Random sample.`
	return new ChaosGame(g, gName, squareWithCentreAnchors(40), randomSample, ratioAction(2/3), createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

function fern(){
	const g = createGraphics(width,height);
	const gName = `Barnsely Fern: see wiki. New position result of function chosen according to dist. f1 0.01  f2 0.85  f3 0.07  f4 0.07`
	return new ChaosGame(g, gName, fernAnchors(), randomSample, fernAction, createVector(0,0), 1, [renderTransparent(255)]);
}

function ngon(n) {
	const g = createGraphics(width,height);
	const stepSize = perfectRatio(n);
	const gName = `${shapeNames[n]}. Perfect packing step (${stepSize}). Random sample.`
	return new ChaosGame(g, gName, nGonAnchors(n), randomSample, perfectAction(n), createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}


function ngonNoRepeat(n) {
	const g = createGraphics(width,height);
	const gName = `${shapeNames[n]}. Step halfway. Can't pick same vertex consecutively`
	return new ChaosGame(g, gName, nGonAnchors(n), randomSampleNotSameTwice(), halfway, createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}


function ngonNotNeighbourIfLastTwoSame(n) {
	const g = createGraphics(width,height);
	const gName = `${shapeNames[n]}. Step halfway. Can't pick neighbour if last two were the same.`
	return new ChaosGame(g, gName, nGonAnchors(n), randomSampleWithRejectionRules([rejectNeighbourIfLastTwoSame(n)]), halfway, createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

function ngonNotAntiClockwise(n){
	const g = createGraphics(width,height);
	const gName = `${shapeNames[n]}. Step halfway. Can't pick vertex anticlockwise of previous point.`
	return new ChaosGame(g, gName, nGonAnchors(n), randomSampleWithRejectionRules([rejectAntiClockwiseInNgon(n)]), halfway, createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

// only really works for even n
function ngonNotOpposite(n) {
	const g = createGraphics(width,height);
	const gName = `${shapeNames[n]}. Step halfway. Can't pick ${n/2} away from previous point.`
	return new ChaosGame(g, gName, nGonAnchors(n), randomSampleWithRejectionRules([rejecCertainNeighboursInNgon(n, [n/2])]), halfway, createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

function overshoot(n, r, radius) {
	const g = createGraphics(width,height);
	const gName = `${shapeNames[n]}. Step past point (${r}). Random sample.`
	return new ChaosGame(g, gName, nGonAnchorsRadius(n,radius), randomSample, ratioAction(r), createVector(width / 2, height / 2), 40, [renderTransparent(40)]);
}

function overshoot1Point(n, r, radius) {
	const g = createGraphics(width,height);
	const gName = `${shapeNames[n]}. Step past point (${r}). Random sample.`
	return new ChaosGame(g, gName, nGonAnchorsRadius(n,radius), randomSample, ratioAction(r), createVector(width / 2, height / 2), 1, [renderTransparent(40)]);
}

