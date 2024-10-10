

// TODO symetry? 

// Construct a ChaosGame with a starting point, anchor set and a ruleset (sampler and action)
// Anchors : points to choose from as the target
// Sampler (func) : method by which to sample from the anchors
// Action (func) : what to do with a present position and a target position
// start_pos : the start point to iterate.
// num_points : number of points to simulate per step
// render_setups : a list of styling functions to call in order before calling point in each step.
class ChaosGame {
  constructor(graphics, anchors, sampler, action, start_pos, num_points, render_setups) {
    this.g = graphics;
    this.anchors = anchors;
    this.anchorIndices = Array.from({ length: this.anchors.length }, (_, i) => i);
    this.sampler = sampler;
    this.action = action;
    this.points = [];
    this.num_points = num_points;
    this.pointAnchorHistory = [];
    this.baseColour = color(255,255,255);
    for (var pointIndex=0; pointIndex<this.num_points; pointIndex ++){
      this.pointAnchorHistory.push([random(this.anchorIndices), random(this.anchorIndices)]);
    }
    
    console.log(this.pointAnchorHistory);
    
    this.historyLength = 2;
    this.warmupLength = 3;
    this.render_setups = render_setups;
    for (var i=0;i<this.num_points;i++){
      this.points.push(start_pos.copy());
    }
    
    // this.pointAnchorHistory = [...Array(this.num_points)].map(e => Array(0))
    
    // rather than simulating for this, just pre populate the history with random
    // for (var warmups=0; warmups<this.warmupLength; warmups++){
    //   this.step_no_draw(warmups >= this.warmupLength-this.historyLength);
    // }
    
    this.stepCount = 0;
  }

  name(){
    return this.name
  }

  refresh(){
    this.g.clear();
  }

  setDarkMode(wantDark){
    if (wantDark) {
      this.baseColour = color(0,0,0);
    } else {
      this.baseColour = color(255,255,255);
    }
  }

  invertColour(){
    this.darkMode = !this.darkMode;
    this.setDarkMode(this.darkMode)
    this.g.filter(INVERT);
  }
  
  // draw anchors draws to the global buffer so we can control it from sketch
  drawAnchors(){
    stroke(150,20,20);
    strokeWeight(5);
    for (const p of this.anchors) {
      point(p.x, p.y);
    }
  }

  // step the current point
  step() {
    for (var i=0;i<this.render_setups.length; i++){
      this.render_setups[i](this.g, this.baseColour);
    }
    
    for (i=0; i<this.num_points; i++){
        let newTargetAnchor = this.sampler(this.anchorIndices, this.pointAnchorHistory[i]);
        let newTarget = this.anchors[newTargetAnchor];
        this.pointAnchorHistory[i].push(newTargetAnchor); // push new target to end of list
        this.pointAnchorHistory[i].shift(); // remove oldest target from list
        let newPosition = this.action(this.points[i].copy(), newTarget.copy());
        this.g.point(newPosition.x, newPosition.y);
        this.points[i] = newPosition;
        
    }
    
    // text(this.stepCount, this.point.x, this.point.y)
    // circle(this.point.x, this.point.y, 10,10);
    // noStroke();
    // console.log("stepping");
    this.stepCount += 1;
    
  }
}