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

//fern action assumes we get given our choice in the z component of the vector
function fernAction(pos,target){
  const startPos = createVector(pos.x-width/2, pos.y-height/2)
  const funcs = [f1,f2,f3,f4]
  const index = target.z
  const newPos = funcs[index](startPos)
  console.log(newPos)
  const outPos = createVector(newPos.x + width/2, newPos.y + height/2)
  console.log(outPos)
  return outPos
}

function f1(pos){
  const nx = 0
  const ny = 0.16 * pos.y 
  return createVector(nx, ny)
}

function f2(pos){
  const nx = 0.85 * pos.x  + 0.04 * pos.y
  const ny = -0.04 * pos.x + 0.85 * pos.y + 1.6
  return createVector(nx, ny)
}

function f3(pos){
  const nx = 0.2 * pos.x  - 0.26 * pos.y
  const ny = 0.23 * pos.x + 0.22 * pos.y + 1.6
  return createVector(nx, ny)
}

function f4(pos){
  const nx = -0.15 * pos.x  + 0.28 * pos.y
  const ny = 0.26 * pos.x + 0.24 * pos.y + 0.44
  return createVector(nx, ny)
}