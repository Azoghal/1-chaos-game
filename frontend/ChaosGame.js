
// We need a set of points

// A point selector function

// A behaviour per point function

// A way to draw them on the canvas


// Construct a ChaosGame with a starting point, anchor set and a ruleset (sampler and action)
// Anchors : points to choose from as the target
// Sampler (func) : method by which to sample from the anchors
// Action (func) : what to do with a present position and a target position
// start_pos : the start point to iterate.
class ChaosGame {
  constructor(anchors, sampler, action, start_pos) {
    this.anchors = anchors;
    this.sampler = sampler;
    this.action = action;
    this.point = start_pos;
    this.stepCount = 0;
  }
  
  drawAnchors(){
    strokeWeight(5);
    for (const p of this.anchors) {
      point(p.x, p.y);
    }
  }

  // step the current point
  step() {
    // stroke();
    strokeWeight(2);
    let newTarget = this.sampler(this.anchors);
    let newPosition = this.action(this.point.copy(), newTarget.copy());
    this.point = createVector(newPosition.x,newPosition.y);
    point(this.point.x, this.point.y);
    // text(this.stepCount, this.point.x, this.point.y)
    // circle(this.point.x, this.point.y, 10,10);
    // noStroke();
    // console.log("stepping");
    this.stepCount += 1;
    
  }

}