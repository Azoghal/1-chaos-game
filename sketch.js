let chaosGame;
let justOnce;
let MAX_REJECTIONS = 100;

function setup() {
	createCanvas(600, 600);
	angleMode(DEGREES)
	justOnce = true;
	// chaosGame = sierpinski();
	// chaosGame = overshoot(5,1.4);
	chaosGame = ngonNoRepeat(5)
	// chaosGame = ngon(6);
}


function draw() {
	if (justOnce) {
		background(220);
		chaosGame.drawAnchors();
		justOnce = false;
	}
	update();
}


function update() {
	chaosGame.step();
}

// sierpinski triangle
function sierpinski() {
	return new ChaosGame(triangleAnchors(), randomSample, halfway, createVector(width / 2, height / 2), 40, [renderTransparent(40)]);
}

function ngon(n) {
	return new ChaosGame(nGonAnchors(n), randomSample, perfectAction(n), createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}


function ngonNoRepeat(n) {
	return new ChaosGame(nGonAnchors(n), randomSampleNotSameTwice(), halfway, createVector(width / 2, height / 2), 10, [renderTransparent(40)]);
}

function overshoot(n, r) {
	return new ChaosGame(nGonAnchors(n), randomSample2, ratioAction(r), createVector(width / 2, height / 2), 40, [renderTransparent(40)]);
}



